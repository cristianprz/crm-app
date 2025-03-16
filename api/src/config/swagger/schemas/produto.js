export const produtoSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'ID único do produto',
    },
    nome: {
      type: 'string',
      description: 'Nome do produto',
    },
    valorUnitario: {
      type: 'number',
      description: 'Valor unitário do produto',
    },
  },
  example: {
    id: 1,
    nome: "Suco de Laranja 1L",
    valorUnitario: 8.90
  }
};

export default produtoSchema;