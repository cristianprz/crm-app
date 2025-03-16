export const revendasMock = [
    {
        id: "rev_7f8d3a2e1b5c9f6d",
        cnpj: "33.000.167/0001-01",
        razaoSocial: "Distribuidora Norte Ltda",
        nomeFantasia: "Bebidas Norte",
        email: "contato@bebidasnorte.com.br",
        telefones: ["11998765432", "1133334444"],
        contatos: [
            {
                nome: "João Silva",
                telefone: "11998765432",
                email: "joao@bebidasnorte.com.br",
                principal: true
            },
            {
                nome: "Maria Souza",
                telefone: "11987654321",
                email: "maria@bebidasnorte.com.br",
                principal: false
            }
        ],
        enderecosEntrega: [
            {
                logradouro: "Rua das Bebidas",
                numero: "123",
                complemento: "Galpão 4",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "01001-000"
            }
        ],
        clientes: [
            { id: "cli_a1b2c3d4e5f6g7h8", nome: "Restaurante Sabor Caseiro", telefone: "11999991111" },
            { id: "cli_9i8j7k6l5m4n3o2", nome: "Bar do Zé", telefone: "11988882222" }
        ],
        dataCriacao: "2025-03-10T14:30:00Z",
        dataAtualizacao: "2025-03-10T14:30:00Z"
    },
    {
        id: "rev_4d5e6f7g8h9i0j1",
        cnpj: "45.997.418/0001-53",
        razaoSocial: "Bebidas Sul S.A.",
        nomeFantasia: "Sul Bebidas",
        email: "contato@sulbebidas.com.br",
        telefones: ["21987654321", "2133334444"],
        contatos: [
            {
                nome: "Roberto Santos",
                telefone: "21987654321",
                email: "roberto@sulbebidas.com.br",
                principal: true
            }
        ],
        enderecosEntrega: [
            {
                logradouro: "Avenida Rio Branco",
                numero: "456",
                complemento: "Loja 2",
                bairro: "Centro",
                cidade: "Rio de Janeiro",
                estado: "RJ",
                cep: "20040-002"
            }
        ],
        clientes: [
            { id: "cli_2p3q4r5s6t7u8v9", nome: "Botequim Carioca", telefone: "21977773333" },
            { id: "cli_0w1x2y3z4a5b6c7", nome: "Restaurante Maravilha", telefone: "21966664444" }
        ],
        dataCriacao: "2025-03-12T09:15:00Z",
        dataAtualizacao: "2025-03-12T09:15:00Z"
    }
];

export default revendasMock;