import { Router } from 'express';
import PedidoController from '../controllers/pedidoController.js';

const router = Router();
const pedidoController = new PedidoController();

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *                 description: Nome do cliente
 *               bebidas:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de bebidas pedidas
 *               valor:
 *                 type: number
 *                 description: Valor total do pedido
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       500:
 *         description: Erro ao criar pedido
 */
router.post('/pedidos', pedidoController.criarPedido.bind(pedidoController));

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   cliente:
 *                     type: string
 *                   bebidas:
 *                     type: array
 *                     items:
 *                       type: string
 *                   valor:
 *                     type: number
 *                   status:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erro ao listar pedidos
 */
router.get('/pedidos', pedidoController.getPedidos.bind(pedidoController));

export default router;