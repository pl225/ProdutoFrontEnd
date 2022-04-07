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
                .post(`${URL}produtos`, dados);
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }

}