"use strict";
import React, {Component} from 'react'
import {Link} from 'react-router';

export default class PNF extends Component {
    render() {
        return (
            <div>
                <h1>404 Page not found</h1>
                <Link to="/" className="btn btn-default">Go to Home</Link>
            </div>
        );
    }
}

