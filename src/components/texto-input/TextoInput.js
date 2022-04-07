import React from 'react';

export class TextoInput extends React.Component {

    render() {
        return (
            <label>
                {this.props.label}:
                <input type="text" value={this.props.value || ''} onChange={(event) => this.props.onChange(event)} />
            </label>
        );
    }

}