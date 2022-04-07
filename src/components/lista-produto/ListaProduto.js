import React from 'react';
import { ProdutoRepository } from '../../repositories/produto.repository';

export class ListaProdutoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };

        this.repository = new ProdutoRepository();
    }

    componentDidMount() {
        this.repository
            .findAll()
            .then(res => {
                this.setState({
                    isLoaded: true,
                    items: res
                });
            })
            .catch(err => {
                this.setState({
                    isLoaded: true,
                    error: err
                });
            });
    }

    render() {
        const { error, isLoaded, items } = this.state;

        if (items) {
            return (
                <div>
                    <div>
                        <p>Produtos</p>
                        <button>Cadastrar produto</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Código</th>
                                <th>Valor</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                items.map(i => {
                                    return (
                                        <tr key={i.id}>
                                            <td>{i.nome}</td>
                                            <td>{i.codigo}</td>
                                            <td>{i.valor}</td>
                                            <td>{i.categoria.nome}</td>
                                        </tr>
                                    );
                                }) 
                            }
                        </tbody>
                    </table>
                </div>
            )
        } else if (!isLoaded) {
            return <div>Carregando...</div>
        } else {
            return <p>Erro: {error.toString()}</p>
        }
    }

}