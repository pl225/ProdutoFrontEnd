import React from 'react';
import './TextoInput.css';

export class TextoInput extends React.Component {

    render() {
        return (
            <label className='item'>
                {this.props.label}:
                <input type="text" value={this.props.value || ''} onChange={(event) => this.props.onChange(event)} />
            </label>
        );
    }

}