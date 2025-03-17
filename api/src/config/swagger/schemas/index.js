import revendaSchema from './revenda.js';
import pedidoSchema from './pedido.js';
import produtoSchema from './produto.js';
import clienteSchema from './cliente.js';
import pedidoAgregadoSchema from './pedidoAgregado.js';

export default {
  Revenda: revendaSchema,
  Pedido: pedidoSchema,
  Produto: produtoSchema,
  Cliente: clienteSchema,
  PedidoAgregado: pedidoAgregadoSchema
};