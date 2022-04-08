import axios from 'axios';
import { URL } from './config';

export class ProdutoRepository {

    async executarPromise(promise) {
        try {
            return await promise;
        } catch (err) {
            if (err.response && err.response.data && 'message' in err.response.data) {
                const message = err.response.data.message;
                if (typeof message === 'string')
                    throw new Error(message);
                else
                    throw new Error(message.join());
            } else {
                throw new Error(err.toString());
            }
        }
    }

    async findAll() {
        const response = await this.executarPromise(
            axios.get(`${URL}produtos`)
        );
        return response.data;
    }

    async criar(dados) {
        const response = await this.executarPromise(
            axios
                .post(`${URL}produtos`, {
                    nome: dados.nome,
                    codigo: dados.codigo,
                    valor: parseFloat(dados.valor),
                    categoriaId: dados.categoria
                })
        );
        return response.data;
    }

    async excluir(id) {
        const response = await this.executarPromise(
            axios
                .delete(`${URL}produtos/${id}`)
        );
        return response.data;
    }

    async findById(id) {
        const response = await this.executarPromise(
            axios
                .get(`${URL}produtos/${id}`)
        );
        const produto = response.data;
        return {
            nome: produto.nome,
            codigo: produto.codigo,
            valor: produto.valor.toString(),
            categoria: produto.categoria.id
        };
    }

    async editar(id, dados) {
        const response = await this.executarPromise(
            axios
                .put(`${URL}produtos/${id}`, {
                    nome: dados.nome,
                    codigo: dados.codigo,
                    valor: parseFloat(dados.valor),
                    categoriaId: dados.categoria
                })
        );
        return response.data;
    }

}