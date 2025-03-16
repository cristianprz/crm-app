class PedidoController {
    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }

    async criarPedido(req, res) {
        try {
            const pedidoData = req.body;
            const novoPedido = await this.orderService.createPedido(pedidoData);
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
            res.status(500).json({ message: 'Error consultar pedidos', error: error.message });
        }
    }
}

export default PedidoController;