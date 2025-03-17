import revendaSchema from './schemas/revenda.js';
import pedidoSchema from './schemas/pedido.js';
import produtoSchema from './schemas/produto.js';
import pedidoAgregadoSchema from './schemas/pedidoAgregado.js';
import revendasPaths from './paths/revendas.js';
import pedidosPaths from './paths/pedidos.js';
import integracaoPaths from './paths/integracao.js';

export const schemas = {
  Revenda: revendaSchema,
  Pedido: pedidoSchema,
  Produto: produtoSchema,
  PedidoAgregado: pedidoAgregadoSchema
};

export const paths = {
  ...revendasPaths,
  ...pedidosPaths,
  ...integracaoPaths
};

export default {
  schemas,
  paths
};