import React from 'react'
import { connect } from 'react-redux';
import { fetchAllRoles } from '../../actions/roles';
import { addNewUser } from '../../actions/users';
import UserForm from './userForm';

class UserFormPage extends React.Component {
    submit = formValues => { console.log('formValues: ', formValues);
        this.props.addNewUser(formValues);
    }

    componentDidMount() {
        this.props.fetchAllRoles();
    }

    render() {
        return <UserForm onSubmit={this.submit} {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        roles: state.roles,        
        insertionError: state.insertionError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllRoles: () => dispatch(fetchAllRoles()),
        addNewUser: (params) => dispatch(addNewUser(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFormPage);