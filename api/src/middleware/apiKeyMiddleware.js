import RevendaService from '../services/revendaService.js';

// Dados para simular autenticação por API Key
// Formato: { apiKey: { revendaId, clienteId?, type } }
const API_KEYS = {
  // API Keys de revendas
  'ak_north_123456789abcdef': { revendaId: 'rev_7f8d3a2e1b5c9f6d', type: 'revenda' },
  'ak_south_987654321fedcba': { revendaId: 'rev_4d5e6f7g8h9i0j1', type: 'revenda' },
  
  // API Keys de clientes
  'ak_client_resto_cafe_123': { revendaId: 'rev_7f8d3a2e1b5c9f6d', clienteId: 'cli_a1b2c3d4e5f6g7h8', type: 'cliente' },
  'ak_client_bar_ze_456': { revendaId: 'rev_7f8d3a2e1b5c9f6d', clienteId: 'cli_9i8j7k6l5m4n3o2', type: 'cliente' },
  'ak_client_boteco_789': { revendaId: 'rev_4d5e6f7g8h9i0j1', clienteId: 'cli_2p3q4r5s6t7u8v9', type: 'cliente' },
  'ak_client_restaurante_abc': { revendaId: 'rev_4d5e6f7g8h9i0j1', clienteId: 'cli_0w1x2y3z4a5b6c7', type: 'cliente' }
};

const revendaService = new RevendaService();

export const validateApiKey = async (req, res, next) => {
  try { 
    const apiKeyRevenda = req.headers['x-api-key-revenda'];
    const apiKeyCliente = req.headers['x-api-key-cliente'];
     
    if (!apiKeyRevenda || !apiKeyCliente) {
      return res.status(401).json({ 
        error: 'Não autorizado', 
        message: 'API Key de revenda e cliente são necessárias' 
      });
    }
      
    const keyDataRevenda = API_KEYS[apiKeyRevenda];
    if (!keyDataRevenda || keyDataRevenda.type !== 'revenda') {
      return res.status(401).json({ 
        error: 'Não autorizado', 
        message: 'API Key de revenda inválida'
      });
    }
     
    const keyDataCliente = API_KEYS[apiKeyCliente];
    if (!keyDataCliente || keyDataCliente.type !== 'cliente') {
      return res.status(401).json({ 
        error: 'Não autorizado', 
        message: 'API Key de cliente inválida'
      });
    }
     
    if (keyDataCliente.revendaId !== keyDataRevenda.revendaId) {
      return res.status(401).json({ 
        error: 'Não autorizado', 
        message: 'API Key de cliente não corresponde à revenda'
      });
    }
    
    const revenda = await revendaService.getRevendaById(keyDataRevenda.revendaId);
    if (!revenda) {
      return res.status(401).json({ 
        error: 'Não autorizado', 
        message: 'Revenda não encontrada'
      });
    }
    
    const cliente = revenda.clientes.find(c => c.id === keyDataCliente.clienteId);
    if (!cliente) {
      return res.status(401).json({ 
        error: 'Não autorizado', 
        message: 'Cliente não encontrado'
      });
    }
    
    req.revenda = revenda;
    req.revendaId = keyDataRevenda.revendaId;
    req.clienteId = keyDataCliente.clienteId;
    req.cliente = cliente;
    
    next();
  } catch (error) {
    console.error('Erro na validação da API Key:', error);
    return res.status(500).json({ 
      error: 'Erro interno', 
      message: 'Erro ao processar autenticação'
    });
  }
};

export default { validateApiKey };