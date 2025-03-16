import { Router } from 'express';
import RevendaController from '../controllers/revendaController.js';

const router = Router();
const revendaController = new RevendaController();

/**
 * @swagger
 * /api/revendas:
 *   post:
 *     summary: Criar uma nova revenda
 *     tags: [Revendas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cnpj
 *               - razaoSocial
 *               - nomeFantasia
 *               - email
 *               - contatos
 *               - enderecosEntrega
 *             properties:
 *               cnpj:
 *                 type: string
 *                 description: CNPJ da revenda
 *               razaoSocial:
 *                 type: string
 *                 description: Razão social da revenda
 *               nomeFantasia:
 *                 type: string
 *                 description: Nome fantasia da revenda
 *               email:
 *                 type: string
 *                 description: Email da revenda
 *               telefones:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de telefones da revenda
 *               contatos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                     telefone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     principal:
 *                       type: boolean
 *                 description: Lista de contatos da revenda
 *               enderecosEntrega:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     logradouro:
 *                       type: string
 *                     numero:
 *                       type: string
 *                     complemento:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     estado:
 *                       type: string
 *                     cep:
 *                       type: string
 *                 description: Lista de endereços de entrega
 *           example:
 *             cnpj: "33.000.167/0001-01"
 *             razaoSocial: "Distribuidora de Bebidas Silva Ltda"
 *             nomeFantasia: "Silva Bebidas"
 *             email: "contato@silvabebidas.com.br"
 *             telefones: ["11998765432", "1133334444"]
 *             contatos: [
 *               {
 *                 nome: "João Silva",
 *                 telefone: "11998765432",
 *                 email: "joao@silvabebidas.com.br",
 *                 principal: true
 *               },
 *               {
 *                 nome: "Maria Silva",
 *                 telefone: "11987654321",
 *                 email: "maria@silvabebidas.com.br",
 *                 principal: false
 *               }
 *             ]
 *             enderecosEntrega: [
 *               {
 *                 logradouro: "Rua das Bebidas",
 *                 numero: "123",
 *                 complemento: "Galpão 4",
 *                 bairro: "Centro",
 *                 cidade: "São Paulo",
 *                 estado: "SP",
 *                 cep: "01001-000"
 *               }
 *             ]
 *     responses:
 *       201:
 *         description: Revenda criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: CNPJ já cadastrado
 *       500:
 *         description: Erro ao criar revenda
 */
router.post('/revendas', revendaController.criarRevenda.bind(revendaController));

/**
 * @swagger
 * /api/revendas:
 *   get:
 *     summary: Lista todas as revendas
 *     tags: [Revendas]
 *     responses:
 *       200:
 *         description: Lista de revendas
 *       500:
 *         description: Erro ao listar revendas
 */
router.get('/revendas', revendaController.listarRevendas.bind(revendaController));

/**
 * @swagger
 * /api/revendas/{id}:
 *   get:
 *     summary: Busca uma revenda pelo ID
 *     tags: [Revendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da revenda
 *     responses:
 *       200:
 *         description: Revenda encontrada
 *       404:
 *         description: Revenda não encontrada
 */
router.get('/revendas/:id', revendaController.buscarRevendaPorId.bind(revendaController));

/**
 * @swagger
 * /api/revendas/{id}:
 *   put:
 *     summary: Atualiza uma revenda
 *     tags: [Revendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da revenda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cnpj
 *               - razaoSocial
 *               - nomeFantasia
 *               - email
 *               - contatos
 *               - enderecosEntrega
 *             properties:
 *               cnpj:
 *                 type: string
 *               razaoSocial:
 *                 type: string
 *               nomeFantasia:
 *                 type: string
 *               email:
 *                 type: string
 *               telefones:
 *                 type: array
 *                 items:
 *                   type: string
 *               contatos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                     telefone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     principal:
 *                       type: boolean
 *               enderecosEntrega:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     logradouro:
 *                       type: string
 *                     numero:
 *                       type: string
 *                     complemento:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     estado:
 *                       type: string
 *                     cep:
 *                       type: string
 *           example:
 *             cnpj: "33.000.167/0001-01"
 *             razaoSocial: "Distribuidora de Bebidas Silva Ltda"
 *             nomeFantasia: "Silva Bebidas"
 *             email: "contato@silvabebidas.com.br"
 *             telefones: ["11998765432", "1133334444"]
 *             contatos: [
 *               {
 *                 nome: "João Silva",
 *                 telefone: "11998765432",
 *                 email: "joao@silvabebidas.com.br",
 *                 principal: true
 *               },
 *               {
 *                 nome: "Maria Silva",
 *                 telefone: "11987654321",
 *                 email: "maria@silvabebidas.com.br",
 *                 principal: false
 *               }
 *             ]
 *             enderecosEntrega: [
 *               {
 *                 logradouro: "Rua das Bebidas",
 *                 numero: "123",
 *                 complemento: "Galpão 4",
 *                 bairro: "Centro",
 *                 cidade: "São Paulo",
 *                 estado: "SP",
 *                 cep: "01001-000"
 *               }
 *             ]
 *     responses:
 *       200:
 *         description: Revenda atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Revenda não encontrada
 *       409:
 *         description: CNPJ já cadastrado em outra revenda
 *       500:
 *         description: Erro ao atualizar revenda
 */
router.put('/revendas/:id', revendaController.atualizarRevenda.bind(revendaController));

/**
 * @swagger
 * /api/revendas/{id}:
 *   delete:
 *     summary: Remove uma revenda
 *     tags: [Revendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da revenda
 *     responses:
 *       200:
 *         description: Revenda removida com sucesso
 *       404:
 *         description: Revenda não encontrada
 */
router.delete('/revendas/:id', revendaController.excluirRevenda.bind(revendaController));

export default router;