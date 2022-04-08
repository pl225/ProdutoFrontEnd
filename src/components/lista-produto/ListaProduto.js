import React from 'react';
import { Link } from 'react-router-dom';
import { ProdutoController } from '../../controllers/produto.controller';
import './ListaProduto.css';

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
            this.setState({
                isLoaded: false,
                items: null
            });
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
                <div className='centro'>
                    <div className='titulo'>
                        <h1>Produtos</h1>
                        <Link to={"persistir"} className="margem">
                            <button className="btn"><i className="fa fa-plus"></i></button>
                        </Link>
                    </div>
                    <table className='tabela'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Código</th>
                                <th>Valor (R$)</th>
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
                                            <td>{i.valor.toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</td>
                                            <td>{i.categoria.nome}</td>
                                            <td>
                                                <div className='centro-horizontal'>
                                                    <Link to={`persistir/${i.id}`} className="margem-interna">
                                                        <button className="btn"><i className="fa fa-edit"></i></button>
                                                    </Link>
                                                    <button
                                                        onClick={() => this.excluir(i.id, i.nome)}
                                                        className="btn margem-interna"
                                                    ><i className="fa fa-trash"></i></button>
                                                </div>
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