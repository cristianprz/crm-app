export const revendasMock = [
    {
        id: 1,
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
        dataCriacao: "2025-03-10T14:30:00Z",
        dataAtualizacao: "2025-03-10T14:30:00Z"
    },
    {
        id: 2,
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
        ] ,
        dataCriacao: "2025-03-12T09:15:00Z",
        dataAtualizacao: "2025-03-12T09:15:00Z"
    }
];
 
export default revendasMock;