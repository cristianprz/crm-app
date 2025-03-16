import { Router } from 'express';
import PedidoController from '../controllers/pedidoController.js';

const router = Router();
const pedidoController = new PedidoController();
 
router.get('/pedidos', pedidoController.getPedidos.bind(pedidoController)); 

 
router.post('/pedidos/cliente', pedidoController.criarPedidoCliente.bind(pedidoController));

export default router;