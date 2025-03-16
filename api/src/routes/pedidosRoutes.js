import { Router } from 'express';
import PedidoController from '../controllers/pedidoController.js';

const router = Router();
const pedidoController = new PedidoController();

router.post('/pedidos', pedidoController.criarPedido.bind(pedidoController));
router.get('/pedidos', pedidoController.getPedidos.bind(pedidoController));
router.get('/pedidos/:id', pedidoController.getPedidos.bind(pedidoController));
//router.put('/pedidos/:id', pedidoController.updatePedido.bind(pedidoController));
//router.delete('/pedidos/:id', pedidoController.deletePedido.bind(pedidoController));
//router.get('/pedidos/revenda/:revendaId', pedidoController.getPedidosByRevendaId.bind(pedidoController));

export default router;