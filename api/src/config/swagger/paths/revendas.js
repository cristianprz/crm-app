export const revendasPaths = {
  '/api/revendas': {
    post: {
      summary: 'Criar uma nova revenda',
      tags: ['Revendas'],
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
              properties: {
                cnpj: {
                  type: 'string',
                  description: 'CNPJ da revenda',
                  example: '33.000.167/0001-01'
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
                email: {
                  type: 'string',
                  description: 'Email da revenda',
                  example: 'contato@silvabebidas.com.br'
                },
                telefones: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description: 'Lista de telefones da revenda',
                  example: ['11998765432', '1133334444']
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
                  example: [
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
                  ]
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
                  example: [
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
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Revenda criada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID da revenda',
                    example: 'rev_7f8d3a2e1b5c9f6d'
                  },
                  cnpj: {
                    type: 'string',
                    description: 'CNPJ da revenda',
                    example: '33.000.167/0001-01'
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
                  email: {
                    type: 'string',
                    description: 'Email da revenda',
                    example: 'contato@silvabebidas.com.br'
                  },
                  telefones: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'Lista de telefones da revenda',
                    example: ['11998765432', '1133334444']
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
                    example: [
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
                    ]
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
                    example: [
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
                }
              }
            }
          }
        },
        401: {
          description: 'Não autorizado - API Key inválida ou não fornecida'
        },
        500: {
          description: 'Erro ao criar revenda'
        }
      }
    },
    get: {
      summary: 'Listar todas as revendas',
      tags: ['Revendas'],
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
      responses: {
        200: {
          description: 'Lista de revendas',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Revenda'
                }
              }
            }
          }
        },
        401: {
          description: 'Não autorizado - API Key inválida ou não fornecida'
        },
        500: {
          description: 'Erro ao listar revendas'
        }
      }
    }
  },
  '/api/revendas/{id}': {
    get: {
      summary: 'Buscar revenda por ID',
      tags: ['Revendas'],
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
          description: 'ID da revenda',
          schema: {
            type: 'string',
            example: 'rev_7f8d3a2e1b5c9f6d'
          }
        }
      ],
      responses: {
        200: {
          description: 'Dados da revenda',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Revenda'
              }
            }
          }
        },
        401: {
          description: 'Não autorizado - API Key inválida ou não fornecida'
        },
        404: {
          description: 'Revenda não encontrada'
        },
        500: {
          description: 'Erro ao buscar revenda'
        }
      }
    },
    put: {
      summary: 'Atualizar revenda por ID',
      tags: ['Revendas'],
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
          description: 'ID da revenda',
          schema: {
            type: 'string',
            example: 'rev_7f8d3a2e1b5c9f6d'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                cnpj: {
                  type: 'string',
                  description: 'CNPJ da revenda',
                  example: '33.000.167/0001-01'
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
                email: {
                  type: 'string',
                  description: 'Email da revenda',
                  example: 'contato@silvabebidas.com.br'
                },
                telefones: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description: 'Lista de telefones da revenda',
                  example: ['11998765432', '1133334444']
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
                  example: [
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
                  ]
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
                  example: [
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
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Revenda atualizada com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Revenda'
              }
            }
          }
        },
        401: {
          description: 'Não autorizado - API Key inválida ou não fornecida'
        },
        404: {
          description: 'Revenda não encontrada'
        },
        500: {
          description: 'Erro ao atualizar revenda'
        }
      }
    },
    delete: {
      summary: 'Excluir revenda por ID',
      tags: ['Revendas'],
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
          description: 'ID da revenda',
          schema: {
            type: 'string',
            example: 'rev_7f8d3a2e1b5c9f6d'
          }
        }
      ],
      responses: {
        204: {
          description: 'Revenda excluída com sucesso'
        },
        401: {
          description: 'Não autorizado - API Key inválida ou não fornecida'
        },
        404: {
          description: 'Revenda não encontrada'
        },
        500: {
          description: 'Erro ao excluir revenda'
        }
      }
    }
  }
};

export default revendasPaths;