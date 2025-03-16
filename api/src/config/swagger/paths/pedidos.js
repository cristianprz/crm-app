export const pedidosPaths = {
  '/api/pedidos': {
    post: {
      summary: 'Criar um novo pedido',
      tags: ['Pedidos'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pedido'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Pedido criado com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pedido'
              }
            }
          }
        },
        400: {
          description: 'Dados inválidos'
        }, 
        500: {
          description: 'Erro ao criar pedido'
        }
      }
    },
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
  '/api/pedidos/{id}': {
    get: {
      summary: 'Busca um pedido pelo ID',
      tags: ['Pedidos'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID do pedido'
        }
      ],
      responses: {
        200: {
          description: 'Pedido encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pedido'
              }
            }
          }
        },
        404: {
          description: 'Pedido não encontrado'
        }
      }
    },
    put: {
      summary: 'Atualiza um pedido',
      tags: ['Pedidos'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID do pedido'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pedido'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Pedido atualizado com sucesso'
        },
        400: {
          description: 'Dados inválidos'
        },
        404: {
          description: 'Pedido não encontrado'
        },
        500: {
          description: 'Erro ao atualizar pedido'
        }
      }
    },
    delete: {
      summary: 'Remove um pedido',
      tags: ['Pedidos'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID do pedido'
        }
      ],
      responses: {
        200: {
          description: 'Pedido removido com sucesso'
        },
        404: {
          description: 'Pedido não encontrado'
        }
      }
    }
  },
  '/api/pedidos/revenda/{revendaId}': {
    get: {
      summary: 'Lista todos os pedidos de uma revenda',
      tags: ['Pedidos'],
      parameters: [
        {
          in: 'path',
          name: 'revendaId',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da revenda'
        }
      ],
      responses: {
        200: {
          description: 'Lista de pedidos da revenda',
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
        404: {
          description: 'Revenda não encontrada'
        },
        500: {
          description: 'Erro ao listar pedidos'
        }
      }
    }
  }
};

export default pedidosPaths;