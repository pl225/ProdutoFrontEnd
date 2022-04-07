import { ProdutoRepository } from "../repositories/produto.repository";

export class ProdutoController {
    constructor() {
        this.produtoRepository = new ProdutoRepository();
    }

    findAll() {
        return this.produtoRepository.findAll();
    }

    validarCriacaoEdicao(dados) {
        if (!dados.nome || dados.nome.length === 0) 
            throw new Error('Preencha o campo nome do produto.');
        if (!dados.codigo || dados.codigo.length === 0) 
            throw new Error('Preencha o campo código do produto.');
        if (!dados.valor || isNaN(dados.valor)) 
            throw new Error('Preencha o campo valor do produto com um número válido');
        if (!dados.categoria || dados.categoria <= 0)
            throw new Error('Selecione uma categoria para o produto.');
    }

    async criar(dados) {
        this.validarCriacaoEdicao(dados);
        return await this.produtoRepository.criar(dados);
    }

    async excluir(id) {
        await this.produtoRepository.excluir(id);
    }

    async findById(id) {
        return await this.produtoRepository.findById(id);
    }

    async editar(id, dados) {
        this.validarCriacaoEdicao(dados);
        return await this.produtoRepository.editar(id, dados);
    }
}