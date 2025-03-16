export const pedidosPaths = {
  '/api/pedidos': {
    get: {
      summary: 'Lista todos os pedidos',
      tags: ['Pedidos'],
      responses: {
        200: {
          description: 'Lista de pedidos',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Pedido'
                }
              }
            }
          }
        },
        500: {
          description: 'Erro ao listar pedidos'
        }
      }
    }
  }, 
  '/api/pedidos/cliente': {
    post: {
      summary: 'Criar pedido de cliente de revenda',
      description: 'Recebe pedidos dos clientes das revendas sem regras de pedido mínimo',
      tags: ['Pedidos de Clientes'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['revendaId', 'itens'],
              properties: {
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
                nome: {
                  type: 'string',
                  description: 'Nome do cliente (opcional se clienteId for fornecido)'
                },
                telefone: {
                  type: 'string',
                  description: 'Telefone do cliente (opcional se clienteId for fornecido)'
                },
                itens: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['produtoId', 'quantidade'],
                    properties: {
                      produtoId: {
                        type: 'integer',
                        description: 'ID do produto'
                      },
                      quantidade: {
                        type: 'integer',
                        minimum: 1,
                        description: 'Quantidade solicitada'
                      }
                    }
                  }
                }
              },
              example: {
                revendaId: "rev_7f8d3a2e1b5c9f6d",
                clienteId: "cli_a1b2c3d4e5f6g7h8",
                itens: [
                  { produtoId: 1, quantidade: 2 },
                  { produtoId: 5, quantidade: 3 }
                ]
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Pedido recebido com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID do pedido',
                    example: 'ped_a4b5c6d7e8f9g0h1'
                  },
                  cliente: {
                    type: 'string',
                    description: 'Nome do cliente'
                  },
                  revendaId: {
                    type: 'string',
                    description: 'ID da revenda',
                    example: 'rev_7f8d3a2e1b5c9f6d'
                  },
                  itens: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        produto: {
                          type: 'string',
                          description: 'Nome do produto'
                        },
                        quantidade: {
                          type: 'integer',
                          description: 'Quantidade solicitada'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Dados inválidos ou insuficientes'
        },
        404: {
          description: 'Revenda ou cliente não encontrado'
        },
        500: {
          description: 'Erro interno do servidor'
        }
      }
    }
  }
};

export default pedidosPaths;