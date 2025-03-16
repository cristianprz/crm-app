export const pedidosMock = [
    {
        id: "ped_a4b5c6d7e8f9g0h1",
        revendaId: "rev_7f8d3a2e1b5c9f6d",
        cliente: {
            id: "cli_a1b2c3d4e5f6g7h8",
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
        id: "ped_i1j2k3l4m5n6o7p8",
        revendaId: "rev_4d5e6f7g8h9i0j1",
        cliente: {
            id: "cli_2p3q4r5s6t7u8v9",
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
        id: "ped_q9r8s7t6u5v4w3x2",
        revendaId: "rev_7f8d3a2e1b5c9f6d",
        cliente: {
            id: "cli_9i8j7k6l5m4n3o2",
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