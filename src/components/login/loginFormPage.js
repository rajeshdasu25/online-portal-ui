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
        // if (localStorage.length > 0) {
        //     this.setState({ redirectToDashboard: true });
        // }
    }

    componentDidUpdate() {
        if (localStorage.length > 0) {
            this.setState({ redirectToDashboard: true });
        }
    }

    render() {
        if (this.state.redirectToDashboard === true) {
            // return localStorage.loginUserType === '1' ? <Redirect to="/" /> : <Redirect to="/new-response" />;
            if (localStorage.loginUserType === '1') {
                return <Redirect to="/" />;
            } else {
                return <Redirect to="/new-response" />;
            }
        }
        return <LoginForm onSubmit={this.submit} {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        loginUserId: state.loginUserId,
        error: state.error,
        loginError: state.loginError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkUserLogin: (params) => dispatch(checkUserLogin(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormPage);