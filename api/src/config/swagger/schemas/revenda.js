export const revendaSchema = {
  type: 'object',
  required: ['cnpj', 'razaoSocial', 'nomeFantasia', 'email', 'contatos', 'enderecosEntrega'],
  properties: {
    id: {
      type: 'integer',
      description: 'ID único da revenda',
    },
    cnpj: {
      type: 'string',
      description: 'CNPJ da revenda',
    },
    razaoSocial: {
      type: 'string',
      description: 'Razão social da revenda',
    },
    nomeFantasia: {
      type: 'string',
      description: 'Nome fantasia da revenda',
    },
    email: {
      type: 'string',
      description: 'Email da revenda',
    },
    telefones: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Lista de telefones da revenda',
    },
    contatos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nome: {
            type: 'string',
          },
          telefone: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          principal: {
            type: 'boolean',
          },
        },
      },
      description: 'Lista de contatos da revenda',
    },
    enderecosEntrega: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          logradouro: {
            type: 'string',
          },
          numero: {
            type: 'string',
          },
          complemento: {
            type: 'string',
          },
          bairro: {
            type: 'string',
          },
          cidade: {
            type: 'string',
          },
          estado: {
            type: 'string',
          },
          cep: {
            type: 'string',
          },
        },
      },
      description: 'Lista de endereços de entrega',
    },  
  },
  example: {
    cnpj: "33.000.167/0001-01",
    razaoSocial: "Distribuidora de Bebidas Silva Ltda",
    nomeFantasia: "Silva Bebidas",
    email: "contato@silvabebidas.com.br",
    telefones: ["11998765432", "1133334444"],
    contatos: [
      {
        nome: "João Silva",
        telefone: "11998765432",
        email: "joao@silvabebidas.com.br",
        principal: true
      },
      {
        nome: "Maria Silva",
        telefone: "11987654321",
        email: "maria@silvabebidas.com.br",
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
    ]
  }
};

export default revendaSchema;