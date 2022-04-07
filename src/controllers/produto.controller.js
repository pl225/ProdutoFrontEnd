import { ProdutoRepository } from "../repositories/produto.repository";

export class ProdutoController {
    constructor() {
        this.produtoRepository = new ProdutoRepository();
    }

    findAll() {
        return this.produtoRepository.findAll();
    }
}