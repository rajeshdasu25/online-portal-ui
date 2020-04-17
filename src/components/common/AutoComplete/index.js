import React from 'react';
import { Field } from 'redux-form';
import countries from './countries';
import certificates from './certificates';
import './style.css';

export default class AutoCompletedText extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            suggestions: [],
            text: ''
        }
    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = certificates.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (
                        <li key={index} onClick={() => this.selectedText(item)}>{item}</li>
                    ))
                }
            </ul>
        );
    }
    
    render() {
        const { text, suggestions } = this.state;
        const { FieldName } = this.props;
        return(
            <div id="notebooks">
                <input id="query" type="text" onChange={this.onTextChange} value={text} className="form-control" />
                {/* <Field name={FieldName} component="input" type="text" onChange={this.onTextChange} value={text} placeholder="Name" className="form-control" /> */}
                {this.renderSuggestions()}
            </div>
        );
    }

}