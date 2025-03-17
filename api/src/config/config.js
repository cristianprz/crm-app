export default {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  fabricaApi: {
    url: process.env.FABRICA_API_URL || 'https://api.fabrica.exemplo.com',
    apiKey: process.env.FABRICA_API_KEY || 'chave_secreta_fabrica',
    timeout: parseInt(process.env.FABRICA_API_TIMEOUT || '30000', 10),
    maxRetries: parseInt(process.env.FABRICA_API_MAX_RETRIES || '3', 10)
  }
};