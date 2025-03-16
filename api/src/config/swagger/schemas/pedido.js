export const pedidoSchema = {
  type: 'object',
  required: ['revendaId', 'itens'],
  properties: {
    id: {
      type: 'string',
      description: 'ID único do pedido (formato: ped_XXXXXXXXXXXX)',
      example: 'ped_a4b5c6d7e8f9g0h1'
    },
    revendaId: {
      type: 'string',
      description: 'ID da revenda',
      example: 'rev_7f8d3a2e1b5c9f6d'
    },
    clienteId: {
      type: 'string',
      description: 'ID do cliente (opcional se nome e telefone forem fornecidos)',
      example: 'cli_a1b2c3d4e5f6g7h8'
    },
    cliente: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'cli_a1b2c3d4e5f6g7h8'
        },
        nome: {
          type: 'string',
        },
        telefone: {
          type: 'string',
        },
      },
      description: 'Cliente que realizou o pedido',
    },
    itens: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          produtoId: {
            type: 'integer',
          },
          produto: {
            type: 'string',
          },
          quantidade: {
            type: 'integer',
          },
          valorUnitario: {
            type: 'number',
          },
          valorTotal: {
            type: 'number',
          },
        },
      },
      description: 'Itens do pedido',
    },
    valorTotal: {
      type: 'number',
      description: 'Valor total do pedido',
    },
    status: {
      type: 'string',
      enum: ['Recebido', 'Em preparo', 'Em rota', 'Entregue', 'Cancelado', 'Integrado'],
      description: 'Status do pedido',
    },
    data: {
      type: 'string',
      format: 'date-time',
      description: 'Data de criação do pedido',
    },
  },
  example: {
    revendaId: "rev_7f8d3a2e1b5c9f6d",
    clienteId: "cli_a1b2c3d4e5f6g7h8",
    itens: [
      {
        produtoId: 1,
        quantidade: 2
      },
      {
        produtoId: 5,
        quantidade: 3
      }
    ]
  }
};

export default pedidoSchema;