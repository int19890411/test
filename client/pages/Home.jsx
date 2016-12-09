"use strict";
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTimes} from '../actions/timesActions.js'
import ButtonCreateTime from '../containers/ButtonCreateTime.jsx'
import ButtonGroupEditTime from '../containers/ButtonGroupEditTime.jsx'


import Table from 'react-bootstrap/lib/Table';
import Pagination from 'react-bootstrap/lib/Pagination';
import Time from 'react-time';

class Home extends Component {
    componentWillMount() {
        this.props.dispatch(fetchTimes(1));
    }

    handleSelectPage(eventKey) {
        this.props.dispatch(fetchTimes(eventKey));
    }

    render() {
        let times = this.props.times;

        let timeItems;
        timeItems = times.map(time => {
            return (
                <tr key={time.id}>
                    <td>{time.worker ? (time.worker.first_name + " " + time.worker.last_name) : ""}</td>
                    <td><Time value={time.date} format="YYYY-MM-DD"/></td>
                    <td><Time value={time.start} format="HH:mm:ss"/></td>
                    <td><Time value={time.end} format="HH:mm:ss"/></td>
                    <td>
                        <ButtonGroupEditTime time={time} />
                    </td>
                </tr>
            );
        });


        return (
            <div className="workers-container">
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.props.pageCount}
                    maxButtons={5}
                    activePage={this.props.page}
                    onSelect={::this.handleSelectPage}/>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Start time</th>
                        <th>End time</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {timeItems}
                    </tbody>
                </Table>
                <ButtonCreateTime/>
            </div>
        );
    }
}

export default connect(
    (store) => ({
        times: store.times.list,
        page: store.times.page,
        pageCount: store.times.pageCount,
    })
)(Home)
