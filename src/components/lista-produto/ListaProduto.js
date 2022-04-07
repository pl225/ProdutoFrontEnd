import React from 'react';
import { Link } from 'react-router-dom';
import { ProdutoController } from '../../controllers/produto.controller';

export class ListaProdutoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: null
        };

        this.controller = new ProdutoController();
    }

    async carregarProdutos() {
        try {
            const produtos = await this.controller.findAll();
            this.setState({
                isLoaded: true,
                items: produtos
            });
        } catch (err) {
            this.setState({
                isLoaded: true,
                error: err
            });
        }
    }

    componentDidMount() {
       this.carregarProdutos();
    }

    async excluir(id, nome) {
        const resp = window.confirm(`Deseja realmente excluir o produto ${nome} ?`);
        if (resp) {
            try {
                await this.controller.excluir(id);
                alert('Produto excluído com sucesso.');
                this.carregarProdutos();
            } catch (err) {
                alert(err)
            }
        }
    }

    render() {
        const { error, isLoaded, items } = this.state;

        if (items) {
            return (
                <div>
                    <div>
                        <p>Produtos</p>
                        <Link to={"persistir"}>
                            <button>Cadastrar produto</button>
                        </Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Código</th>
                                <th>Valor</th>
                                <th>Categoria</th>
                                <th>Ações</th>
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
                                            <td>
                                                <Link to={`persistir/${i.id}`}>
                                                    <button>Editar</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button onClick={() => this.excluir(i.id, i.nome)}>Excluir</button>
                                            </td>
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