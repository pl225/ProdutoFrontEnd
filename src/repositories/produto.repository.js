import axios from 'axios';
import { URL } from './config';

export class ProdutoRepository {

    async findAll() {
        try {
            const response = await axios
                .get(`${URL}produtos`);
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    
    async criar(dados) {
        try {
            const response = await axios
                .post(`${URL}produtos`, {
                    nome: dados.nome,
                    codigo: dados.codigo,
                    valor: parseFloat(dados.valor),
                    categoriaId: dados.categoria
                });
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async excluir(id) {
        try {
            const response = await axios
                .delete(`${URL}produtos/${id}`);
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async findById(id) {
        try {
            const response = await axios
                .get(`${URL}produtos/${id}`);
            const produto = response.data;
            return {
                nome: produto.nome,
                codigo: produto.codigo,
                valor: produto.valor.toString(),
                categoria: produto.categoria.id
            };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async editar(id, dados) {
        try {
            const response = await axios
                .put(`${URL}produtos/${id}`, {
                    nome: dados.nome,
                    codigo: dados.codigo,
                    valor: parseFloat(dados.valor),
                    categoriaId: dados.categoria
                });
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }

}