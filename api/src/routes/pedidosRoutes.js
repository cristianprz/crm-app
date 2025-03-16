const express = require('express');
const PedidoController = require('../controllers/PedidoController.js');

const router = express.Router();
const pedidoController = new PedidoController();

router.post('/pedidos', pedidoController.createOrder.bind(pedidoController));
router.get('/pedidos', pedidoController.getOrders.bind(pedidoController));

module.exports = router;