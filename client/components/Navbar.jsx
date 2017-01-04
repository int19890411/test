"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux'
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap'

class NavBar extends Component {
    render() {
        const {isAuthenticated} = this.props;
        const userLinks = (
            <Nav pullRight>
                <LinkContainer to="/logout">
                    <NavItem>Logout</NavItem>
                </LinkContainer>
            </Nav>
        );

        const guestLinks = (
            <Nav pullRight>
                <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                </LinkContainer>
            </Nav>
        );

        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        React-Bootstrap
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <IndexLinkContainer to="/">
                            <NavItem>Home</NavItem>
                        </IndexLinkContainer>
                        <LinkContainer to="/workers">
                            <NavItem>Workers</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/calendar">
                            <NavItem>Calendar</NavItem>
                        </LinkContainer>
                    </Nav>
                    {isAuthenticated ? userLinks : guestLinks}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default connect((store) => ({
    isAuthenticated: store.auth.isAuthenticated,
}), null, null, {pure: false})(NavBar);

