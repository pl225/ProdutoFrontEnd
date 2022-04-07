import React from 'react';

export class SelectInput extends React.Component {

    render() {
        return (
            <label>
                Escolha {this.props.label}:
                <select value={this.props.value} onChange={(event) => this.props.onChange(event)}>
                    <option key={0} value="0">Selecione {this.props.label}</option>
                    {
                        this.props.items.map(i => {
                            return (
                                <option key={i.id} value={i.id}>{i.nome}</option>
                            );
                        })
                    }
                </select>
            </label>
        );
    }
}