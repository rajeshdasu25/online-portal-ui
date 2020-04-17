import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { checkUserLogin } from '../../actions/auth';
import LoginForm from './loginForm';

class LoginFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToDashboard: false
        }
    }

    submit = formValues => { 
        this.props.checkUserLogin(formValues);
        if (localStorage.length > 0) {
            this.setState({ redirectToDashboard: true });
        }
    }

    render() {
        if (this.state.redirectToDashboard === true) {
            return <Redirect to="/" />;
        }
        return <LoginForm onSubmit={this.submit} {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        loginUserId: state.loginUserId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkUserLogin: (params) => dispatch(checkUserLogin(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormPage);