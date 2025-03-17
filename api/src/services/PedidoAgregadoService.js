import PedidoAgregado from '../models/PedidoAgregado.js';
import StatusPedido from '../models/StatusPedido.js';
import FabricaIntegrationService from './FabricaIntegrationService.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PEDIDOS_AGREGADOS_FILE = path.join(__dirname, '../data/pedidos_agregados.json');
const QUANTIDADE_MINIMA = 1000;

class PedidoAgregadoService {
  constructor() {
    this.pedidosAgregados = [];
    this.fabricaService = new FabricaIntegrationService();
    this.pedidoService = null; // Será injetado posteriormente
    
    // Criar diretório de dados se não existir
    const dataDir = path.join(__dirname, '../data');
    fs.mkdir(dataDir, { recursive: true }).catch(err => {
      console.error('Erro ao criar diretório de dados:', err);
    });
     
    this.carregarPedidosAgregados();
  }
  
  setPedidoService(pedidoService) {
    this.pedidoService = pedidoService;
  }
  
  async carregarPedidosAgregados() {
    try {
      const data = await fs.readFile(PEDIDOS_AGREGADOS_FILE, 'utf8');
      this.pedidosAgregados = JSON.parse(data);
      console.log(`${this.pedidosAgregados.length} pedidos agregados carregados`);
    } catch (error) { 
      if (error.code === 'ENOENT') {
        this.pedidosAgregados = [];
        await this.salvarPedidosAgregados();
        console.log('Arquivo de pedidos agregados criado');
      } else {
        console.error('Erro ao carregar pedidos agregados:', error);
      }
    }
  }
  
  async salvarPedidosAgregados() {
    try {
      await fs.writeFile(PEDIDOS_AGREGADOS_FILE, JSON.stringify(this.pedidosAgregados, null, 2));
    } catch (error) {
      console.error('Erro ao salvar pedidos agregados:', error);
    }
  }
  
  async agruparPedidosParaRevenda(revendaId) {
    if (!this.pedidoService) {
      throw new Error('PedidoService não foi configurado');
    }
     
    
    const pedidosRecebidos = await this.pedidoService.getPedidosByRevendaAndStatus(revendaId, StatusPedido.RECEBIDO);
    
    if (!pedidosRecebidos || pedidosRecebidos.length === 0) {
      return {
        success: false,
        mensagem: 'Não há pedidos recebidos para agrupar',
        quantidadePedidos: 0
      };
    }
    
    console.log(`Encontrados ${pedidosRecebidos.length} pedidos recebidos para a revenda ${revendaId}`);
     
    const itensPorProduto = {};
    const pedidosIds = [];
    
    pedidosRecebidos.forEach(pedido => {
      pedidosIds.push(pedido.id);
      
      pedido.itens.forEach(item => {
        if (!itensPorProduto[item.produtoId]) {
          itensPorProduto[item.produtoId] = {
            produtoId: item.produtoId,
            nome: item.produto, 
            quantidade: 0
          };
        }
        itensPorProduto[item.produtoId].quantidade += item.quantidade;
      });
    });
     
    const itensAgregados = Object.values(itensPorProduto);
     
    const quantidadeTotal = itensAgregados.reduce((total, item) => total + item.quantidade, 0);
     
    if (quantidadeTotal < QUANTIDADE_MINIMA) {
      return {
        success: false,
        mensagem: `O pedido não atinge o mínimo de ${QUANTIDADE_MINIMA} unidades`,
        quantidadeTotal,
        quantidadePedidos: pedidosIds.length
      };
    }
     
    const pedidoAgregado = new PedidoAgregado({
      revendaId,
      pedidosIds,
      itensAgregados,
      quantidadeTotal,
      observacao: `Pedido agrupado de ${pedidosIds.length} pedidos`
    }); 

    this.pedidosAgregados.push(pedidoAgregado);
    await this.salvarPedidosAgregados();
     
    for (const pedidoId of pedidosIds) {
      await this.pedidoService.atualizarStatusPedido(pedidoId, StatusPedido.AGRUPADO, pedidoAgregado.id);
    }
    
    return {
      success: true,
      pedidoAgregado,
      mensagem: 'Pedidos agrupados com sucesso',
      quantidadeTotal,
      quantidadePedidos: pedidosIds.length
    };
  }
  
  async enviarPedidosParaFabrica(revendaId) { 

    const pedidosPendentes = this.pedidosAgregados.filter(
      p => p.revendaId === revendaId && 
      (p.status === 'pendente' || p.status === 'erro') && 
      (!p.pedidoFabricaId)
    );
    
    if (pedidosPendentes.length === 0) {
      return {
        success: false,
        mensagem: 'Não há pedidos agregados pendentes para enviar',
        quantidadePedidos: 0
      };
    }
    
    const resultados = [];
    
    for (const pedido of pedidosPendentes) { 

      pedido.status = 'enviando';
      pedido.tentativas += 1;
      pedido.ultimaTentativa = new Date().toISOString();
      await this.salvarPedidosAgregados();
       
      const resultado = await this.fabricaService.enviarPedidoParaFabrica(pedido);
       
      if (resultado.success) {
        pedido.status = 'confirmado';
        pedido.pedidoFabricaId = resultado.pedidoFabricaId;
        pedido.erro = null;
         
        for (const pedidoId of pedido.pedidosIds) {
          await this.pedidoService.atualizarStatusPedido(
            pedidoId, 
            StatusPedido.INTEGRADO, 
            null, 
            resultado.pedidoFabricaId
          );
        }
      } else {
        pedido.status = 'erro';
        pedido.erro = resultado.erro;
      }
      
      await this.salvarPedidosAgregados();
      resultados.push({
        pedidoAgregadoId: pedido.id,
        success: resultado.success,
        mensagem: resultado.mensagem,
        pedidoFabricaId: resultado.pedidoFabricaId
      });
    }
    
    return {
      success: true,
      mensagem: `Processados ${pedidosPendentes.length} pedidos agregados`,
      resultados
    };
  }
  
  async obterPedidosAgregados(revendaId, status) {
    let pedidos = this.pedidosAgregados;
    
    if (revendaId) {
      pedidos = pedidos.filter(p => p.revendaId === revendaId);
    }
    
    if (status) {
      pedidos = pedidos.filter(p => p.status === status);
    }
    
    return pedidos;
  }
  
  async obterPedidoAgregadoPorId(id) {
    return this.pedidosAgregados.find(p => p.id === id);
  }
 
  async listarPedidosAgregados(revendaId, status = null) {
    try { 
      let pedidosFiltrados = this.pedidosAgregados.filter(p => p.revendaId === revendaId);
       
      if (status) {
        pedidosFiltrados = pedidosFiltrados.filter(p => p.status === status);
      }
        
      pedidosFiltrados.sort((a, b) => 
        new Date(b.dataCriacao) - new Date(a.dataCriacao)
      );
        
      const pedidosFormatados = pedidosFiltrados.map(p => ({
        ...p,   
        quantidadePedidos: p.pedidosIds.length  
      }));
      
      return pedidosFormatados;
    } catch (error) {
      console.error('Erro ao listar pedidos agregados:', error);
      throw new Error(`Falha ao listar pedidos agregados: ${error.message}`);
    }
  }
}

export default PedidoAgregadoService;