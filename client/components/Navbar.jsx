"use strict";
import React, {Component} from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {Link} from 'react-router';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';

class NavBar extends Component {
    getLoginLink() {
        let {username} = this.props;
        return username ?
            <NavItem>{username}</NavItem> :
            <LinkContainer to="/login" activeHref="active">
                <NavItem>Login</NavItem>
            </LinkContainer>;
    }

    render() {
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
                        <IndexLinkContainer to="/" activeHref="active">
                            <NavItem>Home</NavItem>
                        </IndexLinkContainer>
                        <LinkContainer to="/workers" activeHref="active">
                            <NavItem>Workers</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        {::this.getLoginLink()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default NavBar;

