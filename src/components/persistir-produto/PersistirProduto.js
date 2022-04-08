import React from 'react';
import { TextoInput } from '../texto-input/TextoInput';
import { NumeroInput } from '../numero-input/NumeroInput';
import { SelectInput } from '../select-input/SelectInput';
import { CategoriaController } from '../../controllers/categoria.controller';
import { ProdutoController } from '../../controllers/produto.controller';
import { useParams } from 'react-router-dom';
import './PersistirProduto.css';

class PersistirProduto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            categorias: null,
            form: {
                nome: '',
                codigo: '',
                valor: 0,
                categoria: 0
            }
        };

        this.produtoController = new ProdutoController();
        this.categoriaController = new CategoriaController();
        this.id = this.props.params ? this.props.params.produtoId : null;
    }

    async componentDidMount() {
        try {
            const [categorias, produto] = await Promise.all([
                this.categoriaController.findAll(),
                this.id ? this.produtoController.findById(this.id) : Promise.resolve(null)
            ]);
            this.setState({
                isLoaded: true,
                categorias,
                form: produto ? produto : this.state.form
            });
        } catch (err) {
            this.setState({
                isLoaded: true,
                error: err
            });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            if (!this.id) {
                await this.produtoController.criar(this.state.form);
            } else {
                await this.produtoController.editar(this.id, this.state.form);
            }
            alert(`Produto ${this.id ? 'editado' : 'cadastrado'} com sucesso.`);
            window.location = '/';
        } catch (err) {
            alert(err);
        }
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
                <div className='container'>
                    <h1>Cadastrar produto</h1>
                    <form onSubmit={(event) => this.handleSubmit(event)} className="alinhar">
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
                        <div className='linha'>
                            <button onClick={() => window.location = '/'}>Voltar</button>
                            <input type="submit" value="Enviar" />
                        </div>
                    </form>
                </div>
            );
        } else if (!isLoaded) {
            return <div>Carregando...</div>
        } else {
            return <p>Erro: {error.toString()}</p>
        }
    }

}

export function PersistirProdutoComponent() {
    const params = useParams();

    return (
        <PersistirProduto params={params} />
    );
}