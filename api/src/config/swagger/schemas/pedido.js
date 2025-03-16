export const pedidoSchema = {
  type: 'object',
  required: ['revendaId', ,'itens'],
  properties: {
    id: {
      type: 'integer',
      description: 'ID único do pedido',
    },
    revendaId: {
      type: 'integer',
      description: 'ID da revenda',
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
      enum: ['Recebido', 'Em preparo', 'Em rota', 'Entregue', 'Cancelado'],
      description: 'Status do pedido',
    },
    data: {
      type: 'string',
      format: 'date-time',
      description: 'Data de criação do pedido',
    },
  },
  example: {
    revendaId: 1,    
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