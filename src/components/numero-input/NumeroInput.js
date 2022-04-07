import React from 'react';

export class NumeroInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (event.target.validity.patternMismatch) {
            event.target.value = '';
        }
        this.props.onChange(event);
    }

    render() {
        return (
            <label>
                {this.props.label}:
                <input 
                    type="text" 
                    value={this.props.value || ''} 
                    pattern="[0-9]+([,\.][0-9]+)?" 
                    onBlur={(event) => this.handleChange(event)}
                    onChange={(event) => this.props.onChange(event)} />
            </label>
        );
    }

}