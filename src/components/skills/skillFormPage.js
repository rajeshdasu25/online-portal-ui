import React from 'react'
import { connect } from 'react-redux';
import { fetchAllRoles } from '../../actions/roles';
import { addNewSkill } from '../../actions/skills';
import SkillForm from './skillForm';

class SkillFormPage extends React.Component {
    submit = formValues => { 
        this.props.addNewSkill(formValues);
    }

    componentDidMount() {
        this.props.fetchAllRoles();
    }

    render() {
        return <SkillForm onSubmit={this.submit} {...this.props} />
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
        addNewSkill: (params) => dispatch(addNewSkill(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillFormPage);