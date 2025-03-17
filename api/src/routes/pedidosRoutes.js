import { Router } from 'express';
import PedidoController from '../controllers/pedidoController.js';
import { validateApiKey } from '../middleware/apiKeyMiddleware.js';

const router = Router();
const pedidoController = new PedidoController();
 
router.get('/pedidos', validateApiKey, pedidoController.getPedidos.bind(pedidoController));
router.post('/pedidos/cliente', validateApiKey, pedidoController.criarPedidoCliente.bind(pedidoController));

export default router;