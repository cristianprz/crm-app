import RevendaService from './revendaService.js';
import pedidosMock from '../mocks/pedidos.js';
import produtosMock from '../mocks/produtos.js';
import { generatePedidoId, generateClienteId } from '../utils/idGenerator.js';

class PedidoService {
    constructor() {
        this.revendaService = new RevendaService();
        this.pedidos = [...pedidosMock];
        this.produtos = [...produtosMock];
    }

    async getPedidos() {
        return this.pedidos;
    }

    async getPedidosByRevendaId(revendaId) {
        return this.pedidos.filter(p => p.revendaId === revendaId);
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
            const revenda = await this.revendaService.getRevendaById(pedidoData.revendaId);
            if (!revenda) {
                throw new Error(`Revenda com ID ${pedidoData.revendaId} não encontrada`);
            }
             
            const cliente = revenda.clientes.find(c => c.id === pedidoData.clienteId);
            if (!cliente) {
                throw new Error(`Cliente com ID ${pedidoData.clienteId} não encontrado na revenda ${pedidoData.revendaId}`);
            }

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
 
            const novoPedido = {
                id: generatePedidoId(),
                revendaId: pedidoData.revendaId,
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

    async criarPedidoCliente(dadosPedido) {
        if (!dadosPedido.revendaId) {
            throw new Error("ID da revenda é obrigatório");
        }
        
        if (!dadosPedido.itens || !Array.isArray(dadosPedido.itens) || dadosPedido.itens.length === 0) {
            throw new Error("Pelo menos um item deve ser incluído no pedido");
        }

        try {
            const revenda = await this.revendaService.getRevendaById(dadosPedido.revendaId);
            if (!revenda) {
                throw new Error(`Revenda com ID ${dadosPedido.revendaId} não encontrada`);
            }
             
            let cliente;
            
            if (dadosPedido.cliente?.id) { 
                cliente = revenda.clientes.find(c => c.id === dadosPedido.cliente.id);
                 
                if (!cliente) {
                    cliente = {
                        id: dadosPedido.cliente.id,
                        nome: dadosPedido.cliente.nome || "Cliente não identificado",
                        telefone: dadosPedido.cliente.telefone || "Não informado"
                    };
                }
            } else if (dadosPedido.cliente?.nome && dadosPedido.cliente?.telefone) { 
                cliente = revenda.clientes.find(c => c.telefone === dadosPedido.cliente.telefone);
                 
                if (!cliente) {
                    cliente = {
                        id: generateClienteId(),
                        nome: dadosPedido.cliente.nome,
                        telefone: dadosPedido.cliente.telefone
                    };
                }
            } else { 
                cliente = {
                    id: generateClienteId(),
                    nome: "Cliente não identificado",
                    telefone: "Não informado"
                };
            }
            
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
                id: generatePedidoId(),
                revendaId: dadosPedido.revendaId,
                cliente: cliente,
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
        const pedido = this.pedidos.find(p => p.id === id);
        if (!pedido) {
            throw new Error(`Pedido com ID ${id} não encontrado`);
        }
        return pedido;
    }

    async updatePedido(id, dadosAtualizados) {
        const index = this.pedidos.findIndex(pedido => pedido.id === id);
        if (index === -1) {
            throw new Error(`Pedido com ID ${id} não encontrado`);
        }
         
        const pedidoAtualizado = { 
            ...this.pedidos[index],
            ...dadosAtualizados,
            id: this.pedidos[index].id,  
            revendaId: this.pedidos[index].revendaId,             
            data: this.pedidos[index].data,  
            dataAtualizacao: new Date().toISOString()  
        };
        
        this.pedidos[index] = pedidoAtualizado;
        return pedidoAtualizado;
    }

    async atualizarStatusPedido(id, novoStatus) {
        const statusValidos = ["Recebido", "Em preparo", "Em rota", "Entregue", "Cancelado", "Integrado"];
        
        if (!statusValidos.includes(novoStatus)) {
            throw new Error(`Status inválido. Status permitidos: ${statusValidos.join(", ")}`);
        }
        
        return this.updatePedido(id, { status: novoStatus });
    }

    async deletePedido(id) {
        const index = this.pedidos.findIndex(pedido => pedido.id === id);
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