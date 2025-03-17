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
        
        const response = await axios({
          method: 'post',
          url: `${this.apiUrl}/pedidos`,
          data: pedidoFormatado,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          timeout: this.timeout
        });
        
        console.log(`Pedido ${pedidoAgregado.id} enviado com sucesso para a fábrica`);
        return {
          success: true,
          pedidoFabricaId: response.data.pedidoId,
          mensagem: 'Pedido enviado com sucesso',
          detalhes: response.data
        };
      } catch (err) {
        error = err;
        console.error(`Erro na tentativa ${tentativa}:`, err.message);
         
        if (this.isRecoverableError(err)) { 
          const backoffTime = Math.pow(2, tentativa) * 1000;
          await this.sleep(backoffTime);
          tentativa++;
        } else { 
          break;
        }
      }
    }
    
    return {
      success: false,
      mensagem: 'Falha ao enviar pedido para a fábrica',
      erro: error ? error.message : 'Erro desconhecido',
      tentativas: tentativa - 1
    };
  }
  
  isRecoverableError(error) {
     
    if (!error.response) {
      return true;  
    }
    
    const status = error.response.status;
    return status === 429 || // Too Many Requests
           status === 503 || // Service Unavailable
           status === 502 || // Bad Gateway
           status === 504;   // Gateway Timeout
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