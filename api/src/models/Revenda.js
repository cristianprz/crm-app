class Revenda {
    constructor(data) {
        this.id = data.id;
        this.cnpj = data.cnpj;
        this.razaoSocial = data.razaoSocial;
        this.nomeFantasia = data.nomeFantasia;
        this.email = data.email;
        this.telefones = data.telefones || [];
        this.contatos = data.contatos || [];
        this.enderecosEntrega = data.enderecosEntrega || [];
        this.dataCriacao = data.dataCriacao || new Date().toISOString();
        this.dataAtualizacao = new Date().toISOString();
    }
}

export default Revenda;