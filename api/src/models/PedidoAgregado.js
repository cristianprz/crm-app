class PedidoAgregado {
  constructor(dados) {
    this.id = dados.id || `pag_${Date.now()}${Math.floor(Math.random() * 1000)}`;
    this.revendaId = dados.revendaId;
    this.dataCriacao = dados.dataCriacao || new Date().toISOString();
    this.status = dados.status || 'pendente'; // pendente, enviado, confirmado, erro
    this.tentativas = dados.tentativas || 0;
    this.ultimaTentativa = dados.ultimaTentativa;
    this.pedidoFabricaId = dados.pedidoFabricaId;
    this.pedidosIds = dados.pedidosIds || [];
    this.itensAgregados = dados.itensAgregados || [];
    this.quantidadeTotal = dados.quantidadeTotal || 0;
    this.observacao = dados.observacao;
    this.erro = dados.erro;
  }
}

export default PedidoAgregado;