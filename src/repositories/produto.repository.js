import axios from 'axios';
import { URL } from './config';

export class ProdutoRepository {

    async findAll() {
        return await (await axios.get(`${URL}produtos`)).data;
    }

}