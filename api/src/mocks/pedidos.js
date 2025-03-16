export const pedidosMock = [
    {
        id: 1,
        revendaId: 1,
        cliente: {
            id: 101,
            nome: "Restaurante Sabor Caseiro",
            telefone: "11999991111"
        },
        itens: [
            { 
                produtoId: 1,
                produto: "Suco de Laranja 1L", 
                quantidade: 2, 
                valorUnitario: 8.90,
                valorTotal: 17.80
            },
            {
                produtoId: 5,
                produto: "Suco Detox Verde 500ml",
                quantidade: 3,
                valorUnitario: 10.50,
                valorTotal: 31.50
            }
        ],
        valorTotal: 49.30,
        status: "Entregue",
        data: "2025-03-15T10:30:00Z"
    },
    {
        id: 2,
        revendaId: 2,
        cliente: {
            id: 201,
            nome: "Botequim Carioca",
            telefone: "21977773333"
        },
        itens: [
            { 
                produtoId: 3,
                produto: "Suco de Maracujá 1L", 
                quantidade: 2, 
                valorUnitario: 7.90,
                valorTotal: 15.80
            },
            { 
                produtoId: 10,
                produto: "Água de Coco 330ml", 
                quantidade: 6, 
                valorUnitario: 4.50,
                valorTotal: 27.00
            }
        ],
        valorTotal: 42.80,
        status: "Em preparo",
        data: "2025-03-16T09:15:00Z"
    },
    {
        id: 3,
        revendaId: 1,
        cliente: {
            id: 102,
            nome: "Bar do Zé",
            telefone: "11988882222"
        },
        itens: [
            { 
                produtoId: 2,
                produto: "Suco de Uva Integral 500ml", 
                quantidade: 4, 
                valorUnitario: 9.50,
                valorTotal: 38.00
            },
            { 
                produtoId: 6,
                produto: "Suco de Abacaxi com Hortelã 1L", 
                quantidade: 2, 
                valorUnitario: 9.20,
                valorTotal: 18.40
            }
        ],
        valorTotal: 56.40,
        status: "Recebido",
        data: "2025-03-16T15:45:00Z"
    }
];

export default pedidosMock;