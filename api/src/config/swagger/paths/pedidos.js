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
                  type: 'integer',
                  description: 'ID da revenda'
                },
                clienteId: {
                  type: 'integer',
                  description: 'ID do cliente (opcional se nome e telefone forem fornecidos)'
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
                revendaId: 1,
                clienteId: 101,
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
                    type: 'integer',
                    description: 'ID do pedido'
                  },
                  cliente: {
                    type: 'string',
                    description: 'Nome do cliente'
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