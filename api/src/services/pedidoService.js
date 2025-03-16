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
         
        const pedidoAtualizado = { 
            ...this.pedidos[index],
            ...dadosAtualizados,
            id: this.pedidos[index].id, // Manter ID original
            revendaId: this.pedidos[index].revendaId, // Não mudar revenda           
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

    async criarPedidoCliente(dadosPedido) {
        if (!dadosPedido.revendaId) {
            throw new Error("ID da revenda é obrigatório");
        }

        if (!dadosPedido.cliente?.id) {
            throw new Error("ID da cliente é obrigatório");
        }
        
        
        if (!dadosPedido.itens || !Array.isArray(dadosPedido.itens) || dadosPedido.itens.length === 0) {
            throw new Error("Pelo menos um item deve ser incluído no pedido");
        } 

        const revenda = await this.revendaService.getRevendaById(parseInt(dadosPedido.revendaId));
        if (!revenda) {
            throw new Error(`Revenda com ID ${dadosPedido.revendaId} não encontrada`);
        }
          
        let cliente = {
            id: dadosPedido.cliente.id,  
            nome: dadosPedido.cliente?.nome || "Cliente não identificado",
            telefone: dadosPedido.cliente?.telefone || "Não informado"
        };
         
        const itensProcessados = [];
        let valorTotal = 0;
        
        for (const item of dadosPedido.itens) {
            if (!item.produtoId || !item.quantidade || item.quantidade <= 0) {
                throw new Error("Cada item deve ter um produtoId e quantidade válida");
            }
             
            const produto = this.produtos.find(p => p.id === parseInt(item.produtoId));
            if (!produto) {
                throw new Error(`Produto com ID ${item.produtoId} não encontrado`);
            }
             
            const valorItemTotal = produto.valorUnitario * item.quantidade;
             
            itensProcessados.push({
                produtoId: produto.id,
                produto: produto.nome,
                quantidade: item.quantidade,
                valorUnitario: produto.valorUnitario,
                valorTotal: valorItemTotal
            });
            
            valorTotal += valorItemTotal;
        }
         
        const novoPedido = {
            id: this.nextId++,
            revendaId: parseInt(dadosPedido.revendaId),
            cliente: cliente,
            itens: itensProcessados,
            valorTotal,
            status: "Recebido",
            data: new Date().toISOString()
        };
        
        this.pedidos.push(novoPedido);
        return novoPedido;
    }
}

export default PedidoService;