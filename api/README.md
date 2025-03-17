# CRM App - API de Gestão de Pedidos de Revendas

Esta API gerencia pedidos de revendas para fábricas de produtos, integrando-se com sistemas da fábrica e agregando pedidos para processamento em lote. Implementa um sistema de observabilidade robusto e segue práticas modernas de arquitetura de software.

## Tecnologias Utilizadas

- **Backend**: Node.js com Express
- **Módulos**: ES Modules (ESM)
- **Documentação**: Swagger UI
- **Observabilidade**:
  - Logs estruturados (Winston)
  - Métricas (Prometheus)
  - Health checks
- **Formatação e Linting**: ESLint + Prettier

## Estrutura do Projeto

```
crm-app/
├── api/
│   ├── src/
│   │   ├── app.js                # Configuração do Express
│   │   ├── server.js             # Inicialização do servidor
│   │   ├── controllers/          # Controladores de rota
│   │   │   ├── PedidosController.js
│   │   │   ├── RevendasController.js
│   │   │   └── IntegracaoController.js
│   │   ├── routes/               # Definições de rotas
│   │   │   ├── pedidosRoutes.js
│   │   │   ├── revendasRoutes.js
│   │   │   └── integracaoRoutes.js
│   │   ├── services/             # Camada de serviços (lógica de negócio)
│   │   │   ├── pedidoService.js
│   │   │   ├── revendaService.js
│   │   │   ├── PedidoAgregadoService.js 
│   │   │   └── fabricaIntegrationService.js
│   │   ├── middleware/           # Middlewares (autenticação, erros)
│   │   │   ├── apiKeyMiddleware.js
│   │   │   └── errorHandler.js
│   │   ├── config/
│   │   │   ├── logger.js         # Configuração de logs
│   │   │   ├── swagger.js        # Configuração da documentação
│   │   │   └── swagger/          # Definições de rotas no Swagger
│   │   ├── mocks/                # Dados simulados para desenvolvimento
│   │   └── utils/                # Funções utilitárias
│   │       └── idGenerator.js
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── package.json
│   └── README.md
```

## Regras de Negócio

### Revendas
- Cada revenda possui uma API Key para autenticação
- Revendas só podem acessar seus próprios dados e pedidos
- Revendas podem criar, listar e cancelar pedidos

### Pedidos
- Pedidos passam pelos status: Recebido → Agrupado → Enviado → Processado/Falha
- Pedidos podem ser cancelados apenas no status "Recebido"

### Pedidos Agrupados
Os pedidos agrupados são uma característica chave do sistema, funcionando da seguinte maneira:

1. **Critérios para Agrupamento**:
   - Somente pedidos com status "Recebido" são elegíveis
   - Pedidos devem ser da mesma revenda
   - Total mínimo de 1000 unidades necessário para agrupamento

2. **Processo de Agrupamento**:
   - Sistema identifica pedidos elegíveis da revenda
   - Cria um objeto "pedidoAgregado" com IDs dos pedidos incluídos
   - Calcula quantidade total e valor total
   - Atualiza status dos pedidos originais

3. **Integração com a Fábrica**:
   - Pedidos agrupados são enviados para a fábrica
   - Sistema implementa mecanismo de retry em caso de falha
   - Status do pedido é atualizado conforme processamento

4. **Rastreabilidade**:
   - Cada pedido individual mantém referência ao pedido agrupado
   - Pedido agrupado mantém referência ao ID na fábrica

### Integração com Fábrica
- API resiliente com mecanismo automático de retry
- Backup dos pedidos antes do envio
- Simulação de atrasos e falhas para testes de resiliência

### Observabilidade
- Logs estruturados para todas as operações
- Métricas de desempenho via Prometheus
- Health checks para monitoramento da disponibilidade

## Instalação e Execução

### Pré-requisitos
- Node.js 18+ instalado
- NPM 8+ instalado

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/crm-app.git
   cd crm-app/api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

### Execução

1. Inicie a aplicação:
   ```bash
   npm start
   ```

2. Para debug:
   ```bash
   npm run debug
   ```

3. A API estará disponível em: `http://localhost:3000`
4. A documentação Swagger estará em: `http://localhost:3000/api-docs`

## Endpoints Principais

### Autenticação
- Todas as rotas requerem cabeçalho `x-api-key` com API Key válida da revenda

### Revendas
- `GET /api/revendas` - Lista todas as revendas (apenas para admin)
- `GET /api/revendas/:id` - Obtém detalhes de uma revenda
- `POST /api/revendas` - Cadastra uma revenda (apenas para admin)
- `PUT /api/revendas` - Atualiza uma revenda (apenas para admin)
- `DELETE /api/revendas/id` - Deleta uma revenda (apenas para admin)

### Pedidos
- `GET /api/pedidos` - Lista pedidos da revenda autenticada
- `POST /api/pedidos` - Cria novo pedido
- `GET /api/pedidos/:id` - Obtém detalhes de um pedido
- `PUT /api/pedidos/:id/cancelar` - Cancela um pedido

### Integração com Fábrica
- `POST /api/integracao/pedidos/agrupar` - Agrupa pedidos para envio
- `POST /api/integracao/pedidos/enviar-fabrica` - Envia pedido agrupado para fábrica
- `GET /api/integracao/pedidos/agregados` - Lista pedidos agrupados
- `GET /api/integracao/pedidos/agregados/:id` - Obtém detalhes de pedido agrupado

## Observabilidade

1. Métricas Prometheus: `http://localhost:3000/metrics`
2. Health Check: `http://localhost:3000/health`

## Status do Projeto

### Implementado
- API completa com rotas para gerenciamento de pedidos e integração
- Sistema de autenticação via API Key
- Mecanismo de agrupamento de pedidos
- Simulação de integração com fábrica
- Observabilidade básica com logs estruturados e métricas

### Em Desenvolvimento
- **Testes automatizados**: Ainda não foram implementados testes automatizados. O plano futuro é adicionar testes unitários com Jest e testes de integração com Supertest.
- Rastreamento completo com OpenTelemetry
- Integração com Grafana para visualização de métricas

## Licença

ISC
