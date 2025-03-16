import { Router } from 'express';
import RevendaController from '../controllers/revendaController.js';

const router = Router();
const revendaController = new RevendaController();

router.post('/revendas', revendaController.criarRevenda.bind(revendaController));
router.get('/revendas', revendaController.listarRevendas.bind(revendaController));
router.get('/revendas/:id', revendaController.buscarRevendaPorId.bind(revendaController));
router.put('/revendas/:id', revendaController.atualizarRevenda.bind(revendaController));
router.delete('/revendas/:id', revendaController.excluirRevenda.bind(revendaController));

export default router;