import { Router } from 'express';
import RevendaController from '../controllers/revendaController.js';
import { validateRevendaApiKey } from '../middleware/apiKeyMiddleware.js';

const router = Router();
const revendaController = new RevendaController();
 
router.post('/revendas',validateRevendaApiKey,  revendaController.criarRevenda.bind(revendaController));
router.get('/revendas',validateRevendaApiKey,  revendaController.listarRevendas.bind(revendaController));
router.get('/revendas/:id',validateRevendaApiKey,  revendaController.buscarRevendaPorId.bind(revendaController));
router.put('/revendas/:id',validateRevendaApiKey,  revendaController.atualizarRevenda.bind(revendaController));
router.delete('/revendas/:id',validateRevendaApiKey,  revendaController.excluirRevenda.bind(revendaController));

export default router;