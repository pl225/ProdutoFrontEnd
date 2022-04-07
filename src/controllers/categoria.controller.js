import { CategoriaRepository } from "../repositories/categoria.repository";

export class CategoriaController {
    constructor() {
        this.categoriaRepository = new CategoriaRepository();
    }

    findAll() {
        return this.categoriaRepository.findAll();
    }
}