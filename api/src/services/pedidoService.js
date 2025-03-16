class PedidoService {
    constructor() {
        // Mock data
        this.pedidos = [
            {
                id: 1,
                cliente: 'João Silva',
                bebidas: ['Coca-Cola', 'Água'],
                valor: 15.90,
                status: 'Entregue',
                data: '2025-03-15T10:30:00Z'
            },
            {
                id: 2,
                cliente: 'Maria Souza',
                bebidas: ['Suco de Laranja', 'Cerveja'],
                valor: 22.50,
                status: 'Em preparo',
                data: '2025-03-16T09:15:00Z'
            }
        ];
        this.nextId = 3;
    }

    async getPedidos() {
        return this.pedidos;
    }

    async createPedido(pedidoData) {
        const novoPedido = {
            id: this.nextId++,
            ...pedidoData,
            status: 'Recebido',
            data: new Date().toISOString()
        };
        
        this.pedidos.push(novoPedido);
        return novoPedido;
    }

    async getPedidoById(id) {
        return this.pedidos.find(pedido => pedido.id === parseInt(id));
    }

    async updatePedido(id, dadosAtualizados) {
        const index = this.pedidos.findIndex(pedido => pedido.id === parseInt(id));
        if (index === -1) return null;
        
        this.pedidos[index] = { ...this.pedidos[index], ...dadosAtualizados };
        return this.pedidos[index];
    }

    async deletePedido(id) {
        const index = this.pedidos.findIndex(pedido => pedido.id === parseInt(id));
        if (index === -1) return false;
        
        this.pedidos.splice(index, 1);
        return true;
    }
}

export default PedidoService;