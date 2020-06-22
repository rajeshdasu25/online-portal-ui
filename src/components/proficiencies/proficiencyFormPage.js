import React from 'react'
import { connect } from 'react-redux';
import { addNewProficiency } from '../../actions/proficiencies';
import ProficiencyForm from './proficiencyForm';

class ProficiencyFormPage extends React.Component {
    submit = formValues => {
        this.props.addNewProficiency(formValues);
    }

    render() {
        return <ProficiencyForm onSubmit={this.submit} {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        insertionError: state.insertionError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewProficiency: (params) => dispatch(addNewProficiency(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProficiencyFormPage);