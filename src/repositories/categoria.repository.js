import axios from 'axios';
import { URL } from './config';

export class CategoriaRepository {

    async findAll() {
        try {
            const response = await axios
                .get(`${URL}categorias`);
            return response.data;
        } catch (err) {
            throw new Error(err.message);
        }
    }

}