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

}