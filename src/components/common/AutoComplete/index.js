import React from 'react';
import { Field } from 'redux-form';
import './style.css';

export default class AutoCompletedText extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            Field1Text: '',
            Field2Text: ''
        }
    }

    onTextChange = (e) => {
        const { data } = this.props;
        const Field1Value = e.target.value;
        let suggestions = [];

        if (Field1Value.length > 0) {
            const regex = new RegExp(`^${Field1Value}`, 'i');
            suggestions = data.sort().filter(certificate => regex.test(certificate.Name));
        }
        console.log('suggestions: ', suggestions);

        this.setState(() => ({
            suggestions,
            //Field1Text: Field1Value,
            //Field2Text: Field1Value
        })); console.log('onTextChange state: ', this.state);
    }

    selectedText(value) {
        this.setState({
            Field1Text: value,
            suggestions: []
        });
        console.log('selectedText state: ', this.state);
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
        const { Field1Text, Field2Text } = this.state; console.log('render state: ', this.state);
        const { FieldId, Field1Name/*, Field2Name*/ } = this.props;
        return (
            <div id={FieldId}>
                {/* <input id={FieldName} name={FieldName} type="text" onChange={this.onTextChange} value={text} className="form-control" /> */}
                {/* <Field id={FieldName} name={FieldName} component="input" type="text" onChange={this.onTextChange} value={text} className="form-control" /> */}
                <Field id={Field1Name} name={Field1Name} component={this.TextInput} type="text" onChange={this.onTextChange} value={Field1Text} className="form-control" />
                {/* <Field id={Field2Name} name={Field2Name} component={this.TextInput} type="text" value={Field2Text} className="form-control" /> */}
                {this.renderSuggestions()}
            </div>
        );
    }

}