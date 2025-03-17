export const pedidoAgregadoSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'ID único do pedido agregado (formato: pag_XXXXXXXXXXXX)',
      example: 'pag_a1b2c3d4e5f6'
    },
    revendaId: {
      type: 'string',
      description: 'ID da revenda',
      example: 'rev_7f8d3a2e1b5c9f6d'
    },
    razaoSocial: {
      type: 'string',
      description: 'Razão social da revenda',
      example: 'Distribuidora de Bebidas Silva Ltda'
    },
    nomeFantasia: {
      type: 'string',
      description: 'Nome fantasia da revenda',
      example: 'Silva Bebidas'
    },
    cnpj: {
      type: 'string',
      description: 'CNPJ da revenda',
      example: '33.000.167/0001-01'
    },
    pedidosIds: {
      type: 'array',
      items: {
        type: 'string'
      },
      description: 'Lista de IDs dos pedidos que compõem o pedido agregado',
      example: ['ped_a4b5c6d7e8f9g0h1', 'ped_b1c2d3e4f5g6h7i8']
    },
    itens: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          produtoId: {
            type: 'integer',
            description: 'ID do produto'
          },
          produto: {
            type: 'string',
            description: 'Nome do produto'
          },
          quantidade: {
            type: 'integer',
            description: 'Quantidade total do produto'
          },
          precoUnitario: {
            type: 'number',
            description: 'Preço unitário do produto'
          }
        }
      },
      description: 'Itens do pedido agregado'
    },
    quantidadeTotal: {
      type: 'integer',
      description: 'Quantidade total de itens no pedido',
      example: 1500
    },
    valorTotal: {
      type: 'number',
      description: 'Valor total do pedido',
      example: 8985.00
    },
    status: {
      type: 'string',
      description: 'Status atual do pedido agregado',
      enum: ['Agrupado', 'Enviado', 'Falha', 'Processado'],
      example: 'Agrupado'
    },
    idPedidoFabrica: {
      type: 'string',
      description: 'ID do pedido na fábrica (quando enviado com sucesso)',
      example: 'fab_7890123456'
    },
    ultimoErro: {
      type: 'string',
      description: 'Detalhes do último erro (se houver)',
    },
    dataCriacao: {
      type: 'string',
      format: 'date-time',
      description: 'Data de criação do pedido agregado'
    },
    dataAtualizacao: {
      type: 'string',
      format: 'date-time',
      description: 'Data da última atualização do pedido agregado'
    }
  },
  example: {
    id: 'pag_a1b2c3d4e5f6',
    revendaId: 'rev_7f8d3a2e1b5c9f6d',
    razaoSocial: 'Distribuidora de Bebidas Silva Ltda',
    nomeFantasia: 'Silva Bebidas',
    cnpj: '33.000.167/0001-01',
    pedidosIds: ['ped_a4b5c6d7e8f9g0h1', 'ped_b1c2d3e4f5g6h7i8'],
    itens: [
      {
        produtoId: 1,
        produto: 'Suco de Laranja 1L',
        quantidade: 500,
        precoUnitario: 5.99
      },
      {
        produtoId: 2,
        produto: 'Suco de Uva 1L',
        quantidade: 600,
        precoUnitario: 6.99
      },
      {
        produtoId: 3,
        produto: 'Suco de Maçã 1L',
        quantidade: 400,
        precoUnitario: 4.99
      }
    ],
    quantidadeTotal: 1500,
    valorTotal: 8985.00,
    status: 'Agrupado',
    dataCriacao: '2025-03-15T14:30:00Z',
    dataAtualizacao: '2025-03-15T14:30:00Z'
  }
};

export default pedidoAgregadoSchema;