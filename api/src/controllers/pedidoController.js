import PedidoService from '../services/pedidoService.js';

class PedidoController {
    constructor() { 
        this.pedidoService = new PedidoService();
    }

    async criarPedido(req, res) {
        try {
            const pedidoData = req.body;
            const novoPedido = await this.pedidoService.createPedido(pedidoData);
            res.status(201).json(novoPedido);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar pedido', error: error.message });
        }
    }

    async getPedidos(req, res) {
        try {
            const pedidos = await this.pedidoService.getPedidos();
            res.status(200).json(pedidos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao consultar pedidos', error: error.message });
        }
    }
  
    async criarPedidoCliente(req, res) {
        try {
            const { revendaId, clienteId, nome, telefone, itens } = req.body;
             
            if (!revendaId) {
                return res.status(400).json({ error: 'ID da revenda é obrigatório' });
            }
            
            if (!itens || !Array.isArray(itens) || itens.length === 0) {
                return res.status(400).json({ error: 'Pedido deve conter pelo menos um item' });
            }
             
            if (!clienteId && (!nome || !telefone)) {
                return res.status(400).json({ 
                    error: 'Identificação do cliente é obrigatória (clienteId ou nome e telefone)' 
                });
            }
             
            const pedido = await this.pedidoService.criarPedidoCliente({
                revendaId,
                cliente: clienteId ? { id: clienteId } : { nome, telefone },
                itens
            });
             
            return res.status(201).json({
                id: pedido.id,
                cliente: pedido.cliente.nome,
                itens: pedido.itens.map(item => ({
                    produto: item.produto,
                    quantidade: item.quantidade
                }))
            });
        } catch (error) {
            console.error('Erro ao criar pedido de cliente:', error);
            return res.status(400).json({ error: error.message });
        }
    }
}

export default PedidoController;