import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKUP_DIR = path.join(__dirname, '../data/pedidos_backup');

class FabricaIntegrationService {
  constructor() {
    this.apiUrl = config.fabricaApi.url;
    this.apiKey = config.fabricaApi.apiKey;
    this.timeout = config.fabricaApi.timeout || 10000;
    this.maxRetries = config.fabricaApi.maxRetries || 3;
     
    fs.mkdir(BACKUP_DIR, { recursive: true }).catch(err => {
      console.error('Erro ao criar diretório de backup:', err);
    });
  }

  async enviarPedidoParaFabrica(pedidoAgregado) {  
    await this.salvarBackupPedido(pedidoAgregado);
    
    let tentativa = 1;
    let error;
     
    const pedidoFormatado = this.formatarPedidoParaFabrica(pedidoAgregado);
    
    while (tentativa <= this.maxRetries) {
      try {
        console.log(`Tentativa ${tentativa} de envio do pedido ${pedidoAgregado.id}`);
         
        await this.sleep(500 + Math.random() * 800);
         
        if (Math.random() < 0.2 && tentativa < this.maxRetries) {
          throw new Error('Simulação de falha na API da fábrica');
        }
         
        const pedidoFabricaId = `fab_${Date.now().toString().substring(5)}`;
        console.log(`Pedido ${pedidoAgregado.id} simulado com sucesso para a fábrica`);
        
        return {
          success: true,
          pedidoFabricaId: pedidoFabricaId,
          mensagem: 'Pedido enviado com sucesso (simulação)',
          detalhes: {
            pedidoId: pedidoFabricaId,
            dataRecebimento: new Date().toISOString(),
            statusPedido: 'RECEBIDO',
            codigoIntegracao: `INT-${Math.floor(Math.random() * 10000)}`,
            tempoProcessamento: `${Math.floor(Math.random() * 500)}ms`
          }
        };
      } catch (err) {
        error = err;
        console.error(`Erro na tentativa ${tentativa}:`, err.message);
          
        const backoffTime = Math.pow(2, tentativa) * 1000;
        console.log(`Aguardando ${backoffTime}ms antes da próxima tentativa...`);
        await this.sleep(backoffTime);
        tentativa++;
      }
    }
    
    return {
      success: false,
      mensagem: 'Falha ao enviar pedido para a fábrica (simulação)',
      erro: error ? error.message : 'Erro desconhecido',
      tentativas: tentativa - 1
    };
  }
 
  async consultarStatusPedidoFabrica(pedidoFabricaId) { 
    await this.sleep(300 + Math.random() * 500);
     
    const statusOptions = ['RECEBIDO', 'EM_SEPARACAO', 'SEPARADO', 'DESPACHADO', 'ENTREGUE'];
    const hashValue = pedidoFabricaId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const statusIndex = hashValue % statusOptions.length;
    
    return {
      pedidoId: pedidoFabricaId,
      status: statusOptions[statusIndex],
      ultimaAtualizacao: new Date().toISOString(),
      previsaoEntrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 dias a partir de agora
    };
  }
  
 
  isRecoverableError(error) {
    return true; 
  }
  
  async salvarBackupPedido(pedidoAgregado) {
    try {
      const filename = `${pedidoAgregado.id}_${Date.now()}.json`;
      const filePath = path.join(BACKUP_DIR, filename);
      await fs.writeFile(filePath, JSON.stringify(pedidoAgregado, null, 2));
      console.log(`Backup do pedido ${pedidoAgregado.id} salvo em ${filePath}`);
    } catch (error) {
      console.error('Erro ao salvar backup do pedido:', error);
    }
  }
  
  formatarPedidoParaFabrica(pedidoAgregado) {
    return {
      pedidoId: pedidoAgregado.id,
      revendaId: pedidoAgregado.revendaId,
      dataPedido: pedidoAgregado.dataCriacao,
      itens: pedidoAgregado.itensAgregados.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade
      })),
      observacao: pedidoAgregado.observacao || 'Pedido agrupado'
    };
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default FabricaIntegrationService;