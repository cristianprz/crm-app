import revendaSchema from './schemas/revenda.js';
import pedidoSchema from './schemas/pedido.js';
import produtoSchema from './schemas/produto.js';
import revendasPaths from './paths/revendas.js';
import pedidosPaths from './paths/pedidos.js';

export const schemas = {
  Revenda: revendaSchema,
  Pedido: pedidoSchema,
  Produto: produtoSchema
};

export const paths = {
  ...revendasPaths,
  ...pedidosPaths
};

export default {
  schemas,
  paths
};