import React from 'react'
import { connect } from 'react-redux';
import { addNewRole } from '../../actions/roles';
import RoleForm from './roleForm';

class RoleFormPage extends React.Component {
    submit = formValues => {
        this.props.addNewRole(formValues);
    }

    render() {
        return <RoleForm onSubmit={this.submit} {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        insertionError: state.insertionError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewRole: (params) => dispatch(addNewRole(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleFormPage);