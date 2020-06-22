import React from 'react';
import { Field } from 'redux-form';
import './style.css';

export default class AutoCompletedText extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            FieldText: ''
        }
    }

    onTextChange = (e) => {//debugger;
        const { data } = this.props;
        const FieldValue = e.target.value;
        let suggestions = [];

        if (FieldValue.length > 0) {
            const regex = new RegExp(`^${FieldValue}`, 'i');
            let validSuggestions = data.sort().filter(suggestion => regex.test(suggestion.Name));
            let nullSuggestions = [{Id: '0', Name: 'No data found.!!'}];
            suggestions = (validSuggestions.length > 0) ? validSuggestions : nullSuggestions;
        }

        this.setState(() => ({
            suggestions,
            //FieldText: FieldValue
        })); //console.log('onTextChange state: ', this.state);
    }

    selectedText(value) {//console.log('selectedText before state: ', this.state);debugger;
        this.setState(() => {
            return { FieldText: value, suggestions: [] }
        })
        //console.log('selectedText after state: ', this.state);
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul >
                {suggestions.map((item, index) => {
                    return (
                        <li key={index} onClick={() => this.selectedText(item.Name)}>{item.Name}</li>
                    )
                })}
            </ul>
        );
    }

    TextInput = ({ input: reduxFormProps, ...inputProps }) => (
        <input
            type="text"
            {...reduxFormProps}
            {...inputProps}
        />
    );

    render() {
        const { FieldText } = this.state;
        const { FieldId, FieldName } = this.props;
        return (
            <div id={FieldId}>
                {/* <input id={FieldName} name={FieldName} type="text" onChange={this.onTextChange} value={text} className="form-control" /> */}
                {/* <Field id={FieldName} name={FieldName} component="input" type="text" onChange={this.onTextChange} value={text} className="form-control" /> */}
                <Field id={FieldName} name={FieldName} component={this.TextInput} type="text" onChange={this.onTextChange} /*value={FieldText}*/ className="form-control" />
                {this.renderSuggestions()}
            </div>
        );
    }

}