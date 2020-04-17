import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchAUser } from '../../actions/users';

class AppHeader extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        const loginUserSso = localStorage.hasOwnProperty('loginSsoId') && JSON.parse(localStorage.getItem('loginSsoId'));
        this.props.fetchAUser(loginUserSso);
    }

    handleLogout() {
        localStorage.clear();
        this.setState({redirect: true});
    }

    render() { 
        const { user } = this.props;
        const { redirect } = this.state;
        if(redirect){
            return <Redirect push to="/login"/> 
        }
        return (
            <header>
                <Navbar bg="primary" expand="lg">
                    {/* <Navbar.Brand href="/">React Dashboard</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavDropdown title={user.FirstName} id="basic-nav-dropdown" alignRight>
                                <NavDropdown.Item><Link to="/profile">Profile</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.handleLogout}>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAUser: (params) => dispatch(fetchAUser(params))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppHeader);