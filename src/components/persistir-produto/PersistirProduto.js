import React from 'react';
import { ProdutoRepository } from '../../repositories/produto.repository';
import { CategoriaRepository } from '../../repositories/categoria.repository';

export class PersistirProdutoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };

        this.produtoRepository = new ProdutoRepository();
        this.categoriaRepository = new CategoriaRepository();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.categoriaRepository
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

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const { error, isLoaded, items } = this.state;

        if (items) {
            return (
                <fotm onSubmit={this.handleSubmit}>
                    <label>
                        Nome:
                        <input type="text" value={this.state.nome} onChange={this.handleChange} />
                    </label>
                    <label>
                        Codigo:
                        <input type="text" value={this.state.codigo} onChange={this.handleChange} />
                    </label>
                    <label>
                        Valor (R$):
                        <input type="text" value={this.state.valor} onChange={this.handleChange} />
                    </label>
                    <label>
                        Escolha a categoria:
                        <select value={this.state.categoria} onChange={this.handleChange}>
                            {
                                items.map(i => {
                                    return (
                                        <option value={i.id}>{i.nome}</option>
                                    );
                                })
                            }
                        </select>
                    </label>
                    <input type="submit" value="Enviar" />
                </fotm>
            );
        } else if (!isLoaded) {
            return <div>Carregando...</div>
        } else {
            return <p>Erro: {error.toString()}</p>
        }
    }

}