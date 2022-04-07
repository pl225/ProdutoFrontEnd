import React from 'react';
import { ProdutoRepository } from '../../repositories/produto.repository';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { TextoInput } from '../texto-input/TextoInput';
import { NumeroInput } from '../numero-input/NumeroInput';

export class PersistirProdutoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            categorias: [],
            form: {
                nome: '',
                codigo: '',
                valor: 0,
                categoria: 0
            }
        };

        this.produtoRepository = new ProdutoRepository();
        this.categoriaRepository = new CategoriaRepository();
    }

    componentDidMount() {
        this.categoriaRepository
            .findAll()
            .then(res => {
                this.setState({
                    isLoaded: true,
                    categorias: res
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

    handleChange(event, nomeInput) {
        this.setState({ 
            form: { 
                [nomeInput]: event.target.value 
            } 
        });
    }

    render() {
        const { error, isLoaded, categorias } = this.state;

        if (categorias) {
            return (
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <TextoInput 
                        label={'Nome'} 
                        value={this.state.form.nome} 
                        onChange={(event) => this.handleChange(event, 'nome')} 
                    />
                    <TextoInput 
                        label={'Código'} 
                        value={this.state.form.codigo} 
                        onChange={(event) => this.handleChange(event, 'codigo')}
                    />
                    <NumeroInput
                        label={'Valor (R$)'}
                        value={this.state.form.valor}
                        onChange={(event) => this.handleChange(event, 'valor')}
                    />
                    <label>
                        Escolha a categoria:
                        <select value={this.state.categoria} onChange={this.handleChange}>
                            {
                                categorias.map(i => {
                                    return (
                                        <option key={i.id} value={i.id}>{i.nome}</option>
                                    );
                                })
                            }
                        </select>
                    </label>
                    <input type="submit" value="Enviar" />
                </form>
            );
        } else if (!isLoaded) {
            return <div>Carregando...</div>
        } else {
            return <p>Erro: {error.toString()}</p>
        }
    }

}