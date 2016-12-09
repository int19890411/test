"use strict";
import React, {Component} from 'react';
import NavBar from './Navbar.jsx';

export default class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

