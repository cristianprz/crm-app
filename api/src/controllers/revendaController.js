import RevendaService from '../services/revendaService.js';

class RevendaController {
    constructor() {
        this.revendaService = new RevendaService();
    }

    async criarRevenda(req, res) {
        try {
            const dadosRevenda = req.body;
            const novaRevenda = await this.revendaService.criarRevenda(dadosRevenda);
            res.status(201).json(novaRevenda);
        } catch (error) {
            let mensagem = error.message;
            let status = 500;
            
            try {
                const erros = JSON.parse(error.message);
                if (Array.isArray(erros)) {
                    status = 400;
                    mensagem = erros;
                }
            } catch (e) {
                if (error.message === 'CNPJ já cadastrado') {
                    status = 409;
                    mensagem = error.message;
                }
            }
            
            res.status(status).json({ 
                message: 'Erro ao criar revenda', 
                errors: mensagem
            });
        }
    }

    async listarRevendas(req, res) {
        try {
            const revendaId = req.revendaId;
            const revenda = await this.revendaService.buscarRevendaPorId(revendaId);
            res.status(200).json([revenda]);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar revendas', error: error.message });
        }
    }

    async buscarRevendaPorId(req, res) {
        try {
            const revendaId = req.revendaId;
            if (req.params.id !== revendaId) {
                return res.status(403).json({ message: 'Acesso negado' });
            }
            const revenda = await this.revendaService.buscarRevendaPorId(revendaId);
            res.status(200).json(revenda);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async atualizarRevenda(req, res) {
        try {
            const revendaId = req.revendaId;
            if (req.params.id !== revendaId) {
                return res.status(403).json({ message: 'Acesso negado' });
            }
            const dadosRevenda = req.body;
            const revendaAtualizada = await this.revendaService.atualizarRevenda(revendaId, dadosRevenda);
            res.status(200).json(revendaAtualizada);
        } catch (error) {
            let mensagem = error.message;
            let status = 500;
            
            try {
                const erros = JSON.parse(error.message);
                if (Array.isArray(erros)) {
                    status = 400;
                    mensagem = erros;
                }
            } catch (e) {
                if (error.message === 'Revenda não encontrada') {
                    status = 404;
                    mensagem = error.message;
                } else if (error.message === 'CNPJ já cadastrado em outra revenda') {
                    status = 409;
                    mensagem = error.message;
                }
            }
            
            res.status(status).json({ 
                message: 'Erro ao atualizar revenda', 
                errors: mensagem
            });
        }
    }

    async excluirRevenda(req, res) {
        try {
            const revendaId = req.revendaId;
            if (req.params.id !== revendaId) {
                return res.status(403).json({ message: 'Acesso negado' });
            }
            const resultado = await this.revendaService.excluirRevenda(revendaId);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

export default RevendaController;