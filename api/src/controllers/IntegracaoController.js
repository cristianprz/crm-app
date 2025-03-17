import PedidoAgregadoService from '../services/PedidoAgregadoService.js';
import PedidoService from '../services/pedidoService.js';

class IntegracaoController {
  constructor() {
    this.pedidoService = new PedidoService();
    this.pedidoAgregadoService = new PedidoAgregadoService();
     
    this.pedidoAgregadoService.setPedidoService(this.pedidoService);
  }
  
  async agruparPedidos(req, res) {
    try { 
      const revendaId = req.body.revendaId;
      
      if (!revendaId) {
        return res.status(400).json({
          error: 'revendaId não fornecido',
          message: 'É necessário fornecer o ID da revenda'
        });
      }
      
      const resultado = await this.pedidoAgregadoService.agruparPedidosParaRevenda(revendaId);
      
      if (!resultado.success) {
        return res.status(400).json({
          error: 'Erro ao agrupar pedidos',
          message: resultado.mensagem,
          detalhes: resultado
        });
      }
      
      return res.status(201).json({
        message: resultado.mensagem,
        pedidoAgregado: {
          id: resultado.pedidoAgregado.id,
          revendaId: resultado.pedidoAgregado.revendaId,
          quantidadeTotal: resultado.pedidoAgregado.quantidadeTotal,
          quantidadePedidos: resultado.pedidoAgregado.pedidosIds.length,
          dataCriacao: resultado.pedidoAgregado.dataCriacao,
          status: resultado.pedidoAgregado.status
        }
      });
    } catch (error) {
      console.error('Erro ao agrupar pedidos:', error);
      return res.status(500).json({
        error: 'Erro interno',
        message: error.message
      });
    }
  }
  
  async enviarPedidosParaFabrica(req, res) {
    try { 
      const revendaId = req.revendaId;
      
      if (!revendaId) {
        return res.status(400).json({
          error: 'revendaId não fornecido',
          message: 'É necessário fornecer o ID da revenda'
        });
      }
      
      const resultado = await this.pedidoAgregadoService.enviarPedidosParaFabrica(revendaId);
      
      if (!resultado.success) {
        return res.status(400).json({
          error: 'Sem pedidos para enviar',
          message: resultado.mensagem
        });
      }
      
      return res.status(200).json({
        message: resultado.mensagem,
        resultados: resultado.resultados
      });
    } catch (error) {
      console.error('Erro ao enviar pedidos para a fábrica:', error);
      return res.status(500).json({
        error: 'Erro interno',
        message: 'Erro ao processar envio de pedidos para a fábrica',
        detalhes: error.message
      });
    }
  }
  
  async listarPedidosAgregados(req, res) {
    try { 
      const revendaId =  req.query.revendaId;
      const { status } = req.query;
      
      if (!revendaId) {
        return res.status(400).json({
          error: 'revendaId não fornecido',
          message: 'É necessário fornecer o ID da revenda'
        });
      }
      
      const pedidos = await this.pedidoAgregadoService.listarPedidosAgregados(revendaId, status);
      
      return res.status(200).json({
        count: pedidos.length,
        pedidosAgregados: pedidos
      });
    } catch (error) {
      console.error('Erro ao listar pedidos agregados:', error);
      return res.status(500).json({
        error: 'Erro interno',
        message: 'Erro ao listar pedidos agregados',
        detalhes: error.message
      });
    }
  }
  
  async obterPedidoAgregado(req, res) {
    try {
      const id = req.params.id;
      const revendaId =  req.query.revendaId;
      
      if (!id) {
        return res.status(400).json({
          error: 'ID não fornecido',
          message: 'É necessário fornecer o ID do pedido agregado'
        });
      }
      
      const pedido = await this.pedidoAgregadoService.obterPedidoAgregadoPorId(id);
      
      if (!pedido) {
        return res.status(404).json({
          error: 'Pedido não encontrado',
          message: `Pedido agregado ${id} não encontrado`
        });
      }
       
      if (pedido.revendaId !== revendaId) {
        return res.status(403).json({
          error: 'Acesso negado',
          message: 'Você não tem permissão para acessar este pedido'
        });
      }
      
      return res.status(200).json(pedido);
    } catch (error) {
      console.error('Erro ao buscar pedido agregado:', error);
      return res.status(500).json({
        error: 'Erro interno',
        message: 'Erro ao buscar pedido agregado',
        detalhes: error.message
      });
    }
  }
   
  async reenviarPedidosFalhados(req, res) {
    try {
      const revendaId = req.revendaId;
      
      if (!revendaId) {
        return res.status(400).json({
          error: 'revendaId não fornecido', 
          message: 'É necessário fornecer o ID da revenda'
        });
      }
      
      const resultado = await this.pedidoAgregadoService.reenviarPedidosFalhados(revendaId);
      
      return res.status(200).json({
        message: resultado.mensagem,
        quantidadeReenviada: resultado.quantidadeReenviada,
        quantidadeTotal: resultado.quantidadeTotal || 0,
        resultadosDetalhados: resultado.resultados || []
      });
    } catch (error) {
      console.error('Erro ao reenviar pedidos falhados:', error);
      return res.status(500).json({
        error: 'Erro interno',
        message: error.message
      });
    }
  }
}

export default IntegracaoController;