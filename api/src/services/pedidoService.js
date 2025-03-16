import RevendaService from './revendaService.js';
import pedidosMock from '../mocks/pedidos.js';
import produtosMock from '../mocks/produtos.js';

class PedidoService {
    constructor() {
        this.revendaService = new RevendaService();
        this.pedidos = [...pedidosMock];  
        this.produtos = [...produtosMock];  
         
        this.nextId = this.pedidos.length > 0 ? 
                      Math.max(...this.pedidos.map(p => p.id)) + 1 : 1;
    }

    async getPedidos() {
        return this.pedidos;
    }

    async getPedidosByRevendaId(revendaId) {
        return this.pedidos.filter(p => p.revendaId === parseInt(revendaId));
    }

    async createPedido(pedidoData) { 
        if (!pedidoData.revendaId) {
            throw new Error("ID da revenda é obrigatório");
        }         
        
        if (!pedidoData.clienteId) {
            throw new Error("ID do cliente é obrigatório");
        }
        
        if (!pedidoData.itens || !Array.isArray(pedidoData.itens) || pedidoData.itens.length === 0) {
            throw new Error("Pelo menos um item deve ser incluído no pedido");
        }
        
        try {            
            const revenda = await this.revendaService.getRevendaById(parseInt(pedidoData.revendaId));
            if (!revenda) {
                throw new Error(`Revenda com ID ${pedidoData.revendaId} não encontrada`);
            }
 
            const cliente = await this.revendaService.validarClienteRevenda(
                pedidoData.revendaId, 
                pedidoData.clienteId
            );
 
            const itensProcessados = [];
            let valorTotal = 0;

            for (const item of pedidoData.itens) {
                if (!item.produtoId || !item.quantidade || item.quantidade <= 0) {
                    throw new Error("Cada item deve ter um produtoId e quantidade válida");
                }
 
                const produto = this.produtos.find(p => p.id === parseInt(item.produtoId));
                if (!produto) {
                    throw new Error(`Produto com ID ${item.produtoId} não encontrado`);
                }
 
                const valorItemTotal = produto.valorUnitario * item.quantidade;
                const itemProcessado = {
                    produtoId: produto.id,
                    produto: produto.nome,
                    quantidade: item.quantidade,
                    valorUnitario: produto.valorUnitario,
                    valorTotal: valorItemTotal
                };
                
                itensProcessados.push(itemProcessado);
                valorTotal += valorItemTotal;
            }

            // Criar o pedido
            const novoPedido = {
                id: this.nextId++,
                revendaId: parseInt(pedidoData.revendaId),
                cliente: {
                    id: cliente.id,
                    nome: cliente.nome,
                    telefone: cliente.telefone
                },
                itens: itensProcessados,
                valorTotal,
                status: "Recebido",
                data: new Date().toISOString()
            };
            
            this.pedidos.push(novoPedido);
            return novoPedido;
        } catch (error) {
            throw error;
        }
    }

    async getPedidoById(id) {
        const pedido = this.pedidos.find(p => p.id === parseInt(id));
        if (!pedido) {
            throw new Error(`Pedido com ID ${id} não encontrado`);
        }
        return pedido;
    }

    async updatePedido(id, dadosAtualizados) {
        const index = this.pedidos.findIndex(pedido => pedido.id === parseInt(id));
        if (index === -1) {
            throw new Error(`Pedido com ID ${id} não encontrado`);
        }
        
        // Não permite alterar dados fundamentais
        const pedidoAtualizado = { 
            ...this.pedidos[index],
            ...dadosAtualizados,
            id: this.pedidos[index].id, // Manter ID original
            revendaId: this.pedidos[index].revendaId, // Não mudar revenda
            cliente: this.pedidos[index].cliente, // Não mudar cliente
            data: this.pedidos[index].data, // Manter data original
            dataAtualizacao: new Date().toISOString() // Adicionar data de atualização
        };
        
        this.pedidos[index] = pedidoAtualizado;
        return pedidoAtualizado;
    }

    async atualizarStatusPedido(id, novoStatus) {
        const statusValidos = ["Recebido", "Em preparo", "Em rota", "Entregue", "Cancelado"];
        
        if (!statusValidos.includes(novoStatus)) {
            throw new Error(`Status inválido. Status permitidos: ${statusValidos.join(", ")}`);
        }
        
        return this.updatePedido(id, { status: novoStatus });
    }

    async deletePedido(id) {
        const index = this.pedidos.findIndex(pedido => pedido.id === parseInt(id));
        if (index === -1) {
            throw new Error(`Pedido com ID ${id} não encontrado`);
        }
        
        this.pedidos.splice(index, 1);
        return { message: "Pedido excluído com sucesso" };
    }
    
    async getProdutos() {
        return this.produtos;
    }
}

export default PedidoService;