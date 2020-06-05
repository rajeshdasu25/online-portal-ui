import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { fetchAllCertificates } from '../../../actions/certificates';
import certificates from './certificates';
import './style.css';

class AutoCompletedText extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            text: ''
        }
    }
    componentDidMount() {
        this.props.fetchAllCertificates();
    }

    onTextChange = (e) => { //console.log('e: ', e);debugger;
        // const { certificates } = this.props; console.log('cert: ', certificates);
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = certificates.sort().filter(certificate => regex.test(certificate))
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) { //debugger;
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => { //console.log(item, index);
                        return (
                            <li key={index} onClick={() => this.selectedText(item)}>{item}</li>
                        )
                    })
                }
            </ul>
        );
    }

    render() {
        const { text, suggestions } = this.state;
        const { FieldId, FieldName } = this.props;
        return (
            <div id={FieldId}>
                {/* <input id={FieldName} name={FieldName} type="text" onChange={this.onTextChange} value={text} className="form-control" /> */}
                <Field id={FieldName} name={FieldName} component="input" type="text" onChange={this.onTextChange} value={text} className="form-control" />
                {this.renderSuggestions()}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        certificates: state.certificates,
        modal: state.modal
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchAllCertificates: fetchAllCertificates
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AutoCompletedText);