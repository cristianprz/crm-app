export const integracaoPaths = {
  '/api/integracao/pedidos/agrupar': {
    post: {
      summary: 'Agrupar pedidos de uma revenda para envio à fábrica',
      description: 'Busca pedidos com status Recebido e os agrupa em um único pedido para enviar à fábrica.',
      tags: ['Integração'],
      security: [{ apiKey: [] }],
      parameters: [
        {
          name: 'x-api-key',
          in: 'header',
          required: true,
          description: 'API Key da revenda para autenticação',
          schema: {
            type: 'string',
            example: 'ak_north_123456789abcdef'
          }
        }
      ],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                revendaId: {
                  type: 'string',
                  description: 'ID da revenda (opcional, obtido automaticamente da API Key)',
                  example: 'rev_7f8d3a2e1b5c9f6d'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Pedidos agrupados com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Pedidos agrupados com sucesso'
                  },
                  pedidoAgregado: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: 'pag_a1b2c3d4e5f6'
                      },
                      revendaId: {
                        type: 'string',
                        example: 'rev_7f8d3a2e1b5c9f6d',
                        description: 'ID da revenda autenticada'
                      },
                      quantidadeTotal: {
                        type: 'integer',
                        example: 1500
                      },
                      quantidadePedidos: {
                        type: 'integer',
                        example: 3
                      },
                      dataCriacao: {
                        type: 'string',
                        format: 'date-time'
                      },
                      status: {
                        type: 'string',
                        example: 'Agrupado'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Dados insuficientes ou pedidos não atingem o mínimo de 1000 unidades'
        },
        401: {
          description: 'Não autorizado - API Key inválida ou não fornecida'
        },
        500: {
          description: 'Erro interno do servidor'
        }
      }
    }
  },
  '/api/integracao/pedidos/enviar-fabrica': {
    post: {
      summary: 'Enviar pedido agrupado para a fábrica',
      description: 'Envia um pedido agrupado para a API da fábrica com mecanismo de resiliência.',
      tags: ['Integração'],
      security: [{ apiKey: [] }],
      parameters: [
        {
          name: 'x-api-key',
          in: 'header',
          required: true,
          description: 'API Key da revenda para autenticação',
          schema: {
            type: 'string',
            example: 'ak_north_123456789abcdef'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['pedidoAgregadoId'],
              properties: {
                pedidoAgregadoId: {
                  type: 'string',
                  description: 'ID do pedido agregado',
                  example: 'pag_a1b2c3d4e5f6'
                },
                revendaId: {
                  type: 'string',
                  description: 'ID da revenda (opcional, obtido automaticamente da API Key)',
                  example: 'rev_7f8d3a2e1b5c9f6d'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Pedido enviado para a fábrica com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Pedido enviado para a fábrica com sucesso'
                  },
                  pedidoAgregado: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: 'pag_a1b2c3d4e5f6'
                      },
                      revendaId: {
                        type: 'string',
                        example: 'rev_7f8d3a2e1b5c9f6d',
                        description: 'ID da revenda autenticada'
                      },
                      status: {
                        type: 'string',
                        example: 'Enviado'
                      },
                      idPedidoFabrica: {
                        type: 'string',
                        example: 'fab_7890123456'
                      }
                    }
                  },
                  idPedidoFabrica: {
                    type: 'string',
                    example: 'fab_7890123456'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Dados insuficientes'
        },
        401: {
          description: 'Não autorizado - API Key inválida ou não fornecida'
        },
        403: {
          description: 'Forbidden - Tentativa de acessar pedido de outra revenda'
        },
        404: {
          description: 'Pedido agregado não encontrado'
        },
        503: {
          description: 'Falha no envio para a fábrica'
        },
        500: {
          description: 'Erro interno do servidor'
        }
      }
    }
  },
  '/api/integracao/pedidos/agregados': {
    get: {
      summary: 'Listar todos os pedidos agregados da revenda',
      description: 'Lista todos os pedidos agregados da revenda autenticada.',
      tags: ['Integração'],
      security: [{ apiKey: [] }],
      parameters: [
        {
          name: 'x-api-key',
          in: 'header',
          required: true,
          description: 'API Key da revenda para autenticação',
          schema: {
            type: 'string',
            example: 'ak_north_123456789abcdef'
          }
        },
        {
          name: 'revendaId',
          in: 'query',
          required: false,
          description: 'ID da revenda (opcional, obtido automaticamente da API Key)',
          schema: {
            type: 'string',
            example: 'rev_7f8d3a2e1b5c9f6d'
          }
        }
      ],
      responses: {
        200: {
          description: 'Lista de pedidos agregados',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  count: {
                    type: 'integer',
                    example: 2
                  },
                  pedidosAgregados: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'pag_a1b2c3d4e5f6'
                        },
                        revendaId: {
                          type: 'string',
                          example: 'rev_7f8d3a2e1b5c9f6d',
                          description: 'ID da revenda autenticada'
                        },
                        status: {
                          type: 'string',
                          example: 'Enviado'
                        },
                        quantidadeTotal: {
                          type: 'integer',
                          example: 1500
                        },
                        valorTotal: {
                          type: 'number',
                          example: 8985.00
                        },
                        dataCriacao: {
                          type: 'string',
                          format: 'date-time'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        401: {
          description: 'Não autorizado - API Key inválida ou não fornecida'
        },
        500: {
          description: 'Erro interno do servidor'
        }
      }
    }
  },
  '/api/integracao/pedidos/agregados/{id}': {
    get: {
      summary: 'Obter detalhes de um pedido agregado',
      description: 'Obtém detalhes de um pedido agregado específico.',
      tags: ['Integração'],
      security: [{ apiKey: [] }],
      parameters: [
        {
          name: 'x-api-key',
          in: 'header',
          required: true,
          description: 'API Key da revenda para autenticação',
          schema: {
            type: 'string',
            example: 'ak_north_123456789abcdef'
          }
        },
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID do pedido agregado',
          schema: {
            type: 'string',
            example: 'pag_a1b2c3d4e5f6'
          }
        },
        {
          name: 'revendaId',
          in: 'query',
          required: false,
          description: 'ID da revenda (opcional, obtido automaticamente da API Key)',
          schema: {
            type: 'string',
            example: 'rev_7f8d3a2e1b5c9f6d'
          }
        }
      ],
      responses: {
        200: {
          description: 'Detalhes do pedido agregado',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { $ref: '#/components/schemas/PedidoAgregado' },
                  {
                    type: 'object',
                    properties: {
                      revendaId: {
                        type: 'string',
                        example: 'rev_7f8d3a2e1b5c9f6d',
                        description: 'ID da revenda autenticada'
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        401: {
          description: 'Não autorizado - API Key inválida ou não fornecida'
        },
        403: {
          description: 'Forbidden - Tentativa de acessar pedido de outra revenda'
        },
        404: {
          description: 'Pedido agregado não encontrado'
        },
        500: {
          description: 'Erro interno do servidor'
        }
      }
    }
  },
  '/api/integracao/pedidos/reenviar-falhados': {
    post: {
      summary: 'Reenviar pedidos que falharam no envio para a fábrica',
      description: 'Identifica e reenvia todos os pedidos com status "Falha" da revenda autenticada.',
      tags: ['Integração'],
      security: [{ apiKey: [] }],
      parameters: [
        {
          name: 'x-api-key',
          in: 'header',
          required: true,
          description: 'API Key da revenda para autenticação',
          schema: {
            type: 'string',
            example: 'ak_north_123456789abcdef'
          }
        }
      ],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                revendaId: {
                  type: 'string',
                  description: 'ID da revenda (opcional, obtido automaticamente da API Key)',
                  example: 'rev_7f8d3a2e1b5c9f6d'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Resultado do reenvio de pedidos falhados',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Reenviados 2 de 3 pedidos'
                  },
                  revendaId: {
                    type: 'string',
                    example: 'rev_7f8d3a2e1b5c9f6d',
                    description: 'ID da revenda autenticada'
                  },
                  quantidadeReenviada: {
                    type: 'integer',
                    example: 2
                  },
                  quantidadeTotal: {
                    type: 'integer',
                    example: 3
                  },
                  resultadosDetalhados: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        success: {
                          type: 'boolean'
                        },
                        pedidoId: {
                          type: 'string'
                        },
                        idPedidoFabrica: {
                          type: 'string'
                        },
                        erro: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        401: {
          description: 'Não autorizado - API Key inválida ou não fornecida'
        },
        500: {
          description: 'Erro interno do servidor'
        }
      }
    }
  }
};

export default integracaoPaths;