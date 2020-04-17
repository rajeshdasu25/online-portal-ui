import React from 'react'
import { connect } from 'react-redux';
import { addNewTraining } from '../../actions/trainings';
import UserForm from './userForm';

class TrainingFormPage extends React.Component {
    submit = formValues => { 
        this.props.addNewTraining(formValues);
    }

    render() {
        return <UserForm onSubmit={this.submit} {...this.props} />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewTraining: (params) => dispatch(addNewTraining(params))
    };
};

export default connect(null, mapDispatchToProps)(TrainingFormPage);