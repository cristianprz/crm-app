import Revenda from '../models/Revenda.js';
import * as validacoes from '../utils/validacoes.js';
import revendasMock from '../mocks/revendas.js';
import { generateRevendaId, generateClienteId } from '../utils/idGenerator.js';

class RevendaService {
    constructor() {
        this.revendas = [...revendasMock];
    }

    async getRevendaById(id) {
        return this.revendas.find(r => r.id === id);
    }

    validarRevenda(dadosRevenda) {
        const erros = [];

        if (!dadosRevenda.cnpj || !validacoes.validarCNPJ(dadosRevenda.cnpj)) {
            erros.push('CNPJ inválido ou não informado');
        }

        if (!dadosRevenda.razaoSocial || dadosRevenda.razaoSocial.length < 3) {
            erros.push('Razão Social inválida ou não informada');
        }

        if (!dadosRevenda.nomeFantasia || dadosRevenda.nomeFantasia.length < 2) {
            erros.push('Nome Fantasia inválido ou não informado');
        }

        if (!dadosRevenda.email || !validacoes.validarEmail(dadosRevenda.email)) {
            erros.push('E-mail inválido ou não informado');
        }

        if (dadosRevenda.telefones && dadosRevenda.telefones.length > 0) {
            const telefonesInvalidos = dadosRevenda.telefones.filter(tel => !validacoes.validarTelefone(tel));
            if (telefonesInvalidos.length > 0) {
                erros.push('Um ou mais telefones são inválidos');
            }
        }

        if (!dadosRevenda.contatos || dadosRevenda.contatos.length === 0) {
            erros.push('Pelo menos um contato deve ser informado');
        } else {
            const contatosPrincipais = dadosRevenda.contatos.filter(c => c.principal);
            if (contatosPrincipais.length !== 1) {
                erros.push('Deve existir exatamente um contato principal');
            }
            
            const contatosInvalidos = dadosRevenda.contatos.filter(c => !validacoes.validarContato(c));
            if (contatosInvalidos.length > 0) {
                erros.push('Um ou mais contatos são inválidos');
            }
        }

        if (!dadosRevenda.enderecosEntrega || dadosRevenda.enderecosEntrega.length === 0) {
            erros.push('Pelo menos um endereço de entrega deve ser informado');
        } else {
            const enderecosInvalidos = dadosRevenda.enderecosEntrega.filter(e => !validacoes.validarEndereco(e));
            if (enderecosInvalidos.length > 0) {
                erros.push('Um ou mais endereços são inválidos');
            }
        }

        return erros;
    }

    async criarRevenda(dadosRevenda) {
        const erros = this.validarRevenda(dadosRevenda);
        if (erros.length > 0) {
            throw new Error(JSON.stringify(erros));
        }

        const revendaExistente = this.revendas.find(r => r.cnpj === dadosRevenda.cnpj);
        if (revendaExistente) {
            throw new Error('CNPJ já cadastrado');
        }

        const novaRevenda = {
            id: generateRevendaId(),
            ...dadosRevenda,
            clientes: [],
            dataCriacao: new Date().toISOString(),
            dataAtualizacao: new Date().toISOString()
        };

        this.revendas.push(novaRevenda);
        return novaRevenda;
    }     

    async listarRevendas() {
        return this.revendas;
    }

    async buscarRevendaPorId(id) {
        const revenda = this.revendas.find(r => r.id === parseInt(id));
        if (!revenda) {
            throw new Error('Revenda não encontrada');
        }
        return revenda;
    }

    async atualizarRevenda(id, dadosRevenda) {
        const index = this.revendas.findIndex(r => r.id === parseInt(id));
        if (index === -1) {
            throw new Error('Revenda não encontrada');
        }
 
        dadosRevenda.id = parseInt(id);
        
        const erros = this.validarRevenda(dadosRevenda);
        if (erros.length > 0) {
            throw new Error(JSON.stringify(erros));
        }
 
        const revendaExistente = this.revendas.find(r => r.cnpj === dadosRevenda.cnpj && r.id !== parseInt(id));
        if (revendaExistente) {
            throw new Error('CNPJ já cadastrado em outra revenda');
        }

        const revendaAtualizada = new Revenda({
            ...this.revendas[index],
            ...dadosRevenda,
            dataAtualizacao: new Date().toISOString()
        });

        this.revendas[index] = revendaAtualizada;
        return revendaAtualizada;
    }

    async excluirRevenda(id) {
        const index = this.revendas.findIndex(r => r.id === parseInt(id));
        if (index === -1) {
            throw new Error('Revenda não encontrada');
        }

        this.revendas.splice(index, 1);
        return { message: 'Revenda excluída com sucesso' };
    }
}

export default RevendaService;