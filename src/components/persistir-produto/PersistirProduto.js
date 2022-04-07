import React from 'react';
import { ProdutoRepository } from '../../repositories/produto.repository';
import { CategoriaRepository } from '../../repositories/categoria.repository';
import { TextoInput } from '../texto-input/TextoInput';
import { NumeroInput } from '../numero-input/NumeroInput';
import { SelectInput } from '../select-input/SelectInput';

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
        console.log(event)
    }

    handleChange(event, nomeInput) {
        const state = this.state;
        state.form[nomeInput] = event.target.value;
        this.setState(state);
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
                    <SelectInput
                        label={'a categoria'}
                        value={this.state.form.categoria}
                        items={this.state.categorias}
                        onChange={(event) => this.handleChange(event, 'categoria')}
                    />
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