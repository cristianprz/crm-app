import express from 'express';
import PedidoController from '../controllers/PedidoController.js';

const router = express.Router();
const pedidoController = new PedidoController();

router.post('/pedidos', pedidoController.createOrder.bind(pedidoController));
router.get('/pedidos', pedidoController.getOrders.bind(pedidoController));

export default router;