import axios from 'axios';
import PedidoService from './pedidoService.js';
import RevendaService from './revendaService.js';
import { generatePedidoAgregadoId } from '../utils/idGenerator.js';

class IntegracaoService {
  constructor() {
    this.pedidoService = new PedidoService();
    this.revendaService = new RevendaService();
    this.pedidosAgregados = [];
    this.apiUrl = process.env.API_FABRICA_URL || 'https://api.fabrica.exemplo.com';
    this.maxRetries = 3;
    this.retryDelay = 2000; // 2 segundos
  }

  async buscarPedidosParaIntegracao(revendaId) { 
    const pedidos = await this.pedidoService.getPedidosByRevendaIdAndStatus(revendaId, 'Recebido');
    return pedidos;
  }

  async agruparPedidosPorRevenda(revendaId) {
    const pedidos = await this.buscarPedidosParaIntegracao(revendaId);
    
    if (!pedidos || pedidos.length === 0) {
      throw new Error('Não há pedidos recebidos para agrupar');
    }

    const revenda = await this.revendaService.buscarRevendaPorId(revendaId);
     
    const itemsAgrupados = [];
    const pedidosIds = [];
    
    pedidos.forEach(pedido => {
      pedidosIds.push(pedido.id);
      
      pedido.itens.forEach(item => {
        const itemExistente = itemsAgrupados.find(i => i.produtoId === item.produtoId);
        
        if (itemExistente) {
          itemExistente.quantidade += item.quantidade;
        } else {
          itemsAgrupados.push({
            produtoId: item.produtoId,
            produto: item.produto,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario
          });
        }
      });
    });
    
    // Verificar se o pedido atinge o mínimo de 1000 unidades
    const quantidadeTotal = itemsAgrupados.reduce((total, item) => total + item.quantidade, 0);
    
    if (quantidadeTotal < 1000) {
      throw new Error(`Quantidade total insuficiente (${quantidadeTotal}). O pedido mínimo é de 1000 unidades.`);
    }
    
    // Criar o pedido agregado
    const pedidoAgregado = {
      id: generatePedidoAgregadoId(),
      revendaId,
      razaoSocial: revenda.razaoSocial,
      nomeFantasia: revenda.nomeFantasia,
      cnpj: revenda.cnpj,
      pedidosIds,
      itens: itemsAgrupados,
      quantidadeTotal,
      valorTotal: itemsAgrupados.reduce((total, item) => total + (item.quantidade * item.precoUnitario), 0),
      status: 'Agrupado', // Status inicial antes de enviar para a fábrica
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString()
    };
    
    this.pedidosAgregados.push(pedidoAgregado);
    return pedidoAgregado;
  }

  async enviarPedidoParaFabrica(pedidoAgregadoId) {
    const pedidoAgregado = this.pedidosAgregados.find(p => p.id === pedidoAgregadoId);
    
    if (!pedidoAgregado) {
      throw new Error('Pedido agregado não encontrado');
    }
    
    if (pedidoAgregado.status !== 'Agrupado') {
      throw new Error(`Não é possível enviar pedido com status "${pedidoAgregado.status}"`);
    }
     
    const pedidoFabrica = {
      revendaId: pedidoAgregado.revendaId,
      cnpj: pedidoAgregado.cnpj,
      razaoSocial: pedidoAgregado.razaoSocial,
      itens: pedidoAgregado.itens.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade
      })),
      pedidoOrigem: pedidoAgregado.id
    };
    
    try { 
      const respostaFabrica = await this.enviarComRetentativa('/pedidos', pedidoFabrica);
       
      pedidoAgregado.idPedidoFabrica = respostaFabrica.idPedido;
      pedidoAgregado.status = 'Enviado';
      pedidoAgregado.dataAtualizacao = new Date().toISOString();
       
      for (const pedidoId of pedidoAgregado.pedidosIds) {
        await this.pedidoService.atualizarStatusPedido(pedidoId, 'Integrado', pedidoAgregado.idPedidoFabrica);
      }
      
      return {
        sucesso: true,
        pedidoAgregado,
        respostaFabrica
      };
    } catch (error) { 
      pedidoAgregado.status = 'Falha';
      pedidoAgregado.ultimoErro = error.message;
      pedidoAgregado.dataAtualizacao = new Date().toISOString();
      
      return {
        sucesso: false,
        pedidoAgregado,
        erro: error.message
      };
    }
  }
  
  async enviarComRetentativa(endpoint, dados, tentativa = 1) {
    try {
      const url = `${this.apiUrl}${endpoint}`;
      const resposta = await axios.post(url, dados, {
        timeout: 5000, // Timeout de 5 segundos
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_FABRICA_TOKEN || 'token-simulado'}`
        }
      });
      
      return resposta.data;
    } catch (error) {
      console.error(`Tentativa ${tentativa} falhou: ${error.message}`);
      
      if (tentativa < this.maxRetries) {
        // Aumentar o delay exponencialmente entre retentativas
        const delay = this.retryDelay * Math.pow(2, tentativa - 1);
        console.log(`Aguardando ${delay}ms antes da próxima tentativa...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.enviarComRetentativa(endpoint, dados, tentativa + 1);
      } else {
        throw new Error(`Falha após ${this.maxRetries} tentativas: ${error.message}`);
      }
    }
  }
  
  async reenviarPedidosFalhados() {
    const pedidosFalhados = this.pedidosAgregados.filter(p => p.status === 'Falha');
    const resultados = [];
    
    for (const pedido of pedidosFalhados) {
      try {
        const resultado = await this.enviarPedidoParaFabrica(pedido.id);
        resultados.push(resultado);
      } catch (error) {
        resultados.push({
          sucesso: false,
          pedidoId: pedido.id,
          erro: error.message
        });
      }
    }
    
    return resultados;
  }
  
  async listarPedidosAgregados(revendaId) {
    return this.pedidosAgregados.filter(p => p.revendaId === revendaId);
  }
  
  async obterPedidoAgregado(id, revendaId) {
    const pedido = this.pedidosAgregados.find(p => p.id === id && p.revendaId === revendaId);
    if (!pedido) {
      throw new Error('Pedido agregado não encontrado');
    }
    return pedido;
  }
}

export default IntegracaoService;