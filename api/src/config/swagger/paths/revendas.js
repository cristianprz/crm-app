export const revendasPaths = {
  '/api/revendas': {
    post: {
      summary: 'Criar uma nova revenda',
      tags: ['Revendas'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Revenda'
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
                $ref: '#/components/schemas/Revenda'
              }
            }
          }
        },
        400: {
          description: 'Dados inválidos'
        },
        409: {
          description: 'CNPJ já cadastrado'
        },
        500: {
          description: 'Erro ao criar revenda'
        }
      }
    },
    get: {
      summary: 'Lista todas as revendas',
      tags: ['Revendas'],
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
        500: {
          description: 'Erro ao listar revendas'
        }
      }
    }
  },
  '/api/revendas/{id}': {
    get: {
      summary: 'Busca uma revenda pelo ID',
      tags: ['Revendas'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da revenda'
        }
      ],
      responses: {
        200: {
          description: 'Revenda encontrada',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Revenda'
              }
            }
          }
        },
        404: {
          description: 'Revenda não encontrada'
        }
      }
    },
    put: {
      summary: 'Atualiza uma revenda',
      tags: ['Revendas'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da revenda'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Revenda'
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
        400: {
          description: 'Dados inválidos'
        },
        404: {
          description: 'Revenda não encontrada'
        },
        409: {
          description: 'CNPJ já cadastrado em outra revenda'
        },
        500: {
          description: 'Erro ao atualizar revenda'
        }
      }
    },
    delete: {
      summary: 'Remove uma revenda',
      tags: ['Revendas'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da revenda'
        }
      ],
      responses: {
        200: {
          description: 'Revenda removida com sucesso'
        },
        404: {
          description: 'Revenda não encontrada'
        }
      }
    }
  }
};

export default revendasPaths;