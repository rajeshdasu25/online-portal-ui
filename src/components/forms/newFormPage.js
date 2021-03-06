import React from 'react'
import { connect } from 'react-redux';
import { addNewForm } from '../../actions/forms';
import NewForm from './newForm';

class FormSubmitPage extends React.Component {
    submit = formValues => {
        this.props.addNewForm(formValues);
    }

    render() {
        return <NewForm onSubmit={this.submit} {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        insertionError: state.insertionError
    };
}; 

const mapDispatchToProps = dispatch => {
    return {
        addNewForm: (params) => dispatch(addNewForm(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSubmitPage);