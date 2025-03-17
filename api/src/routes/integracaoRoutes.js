import { Router } from 'express';
import IntegracaoController from '../controllers/IntegracaoController.js';
import { validateRevendaApiKey } from '../middleware/apiKeyMiddleware.js';

const router = Router();
const integracaoController = new IntegracaoController();
 
router.post('/integracao/pedidos/agrupar', validateRevendaApiKey, integracaoController.agruparPedidos.bind(integracaoController));
 
router.post('/integracao/pedidos/enviar-fabrica', validateRevendaApiKey, integracaoController.enviarPedidosParaFabrica.bind(integracaoController));
 
router.get('/integracao/pedidos/agregados', validateRevendaApiKey, integracaoController.listarPedidosAgregados.bind(integracaoController));
 
router.get('/integracao/pedidos/agregados/:id', validateRevendaApiKey, integracaoController.obterPedidoAgregado.bind(integracaoController));

export default router;