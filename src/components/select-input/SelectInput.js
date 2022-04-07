import React from 'react';

export class SelectInput extends React.Component {

    render() {
        return (
            <label>
                Escolha {this.props.label}:
                <select value={this.props.value} onChange={(event) => this.props.onChange(event)}>
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