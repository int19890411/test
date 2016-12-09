"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux'
import Time from 'react-time';

import WorkerEditorContainer from '../containers/WorkerEditor.jsx';
import {fetchWorkers} from '../actions/workersActions.js'

import Table from 'react-bootstrap/lib/Table';
import Pagination from 'react-bootstrap/lib/Pagination';

class WorkersTable extends Component {
    componentWillMount() {
        this.props.dispatch(fetchWorkers(1));
    }

    handleSelectPage(eventKey) {
        this.props.dispatch(fetchWorkers(eventKey));
    }

    render() {
        let workers = this.props.workers;

        let workerItems;
        if (workers) {
            workerItems = workers.map(worker => {
                return (
                    <tr key={worker.id}>
                        <td>{worker.first_name}</td>
                        <td>{worker.middle_name}</td>
                        <td>{worker.last_name}</td>
                        <td>{worker.sex}</td>
                        <td>{worker.contact}</td>
                        <td><Time value={worker.updatedAt} format="YYYY-MM-DD HH:mm:ss"/></td>
                        <td>
                            <WorkerEditorContainer worker={worker}/>
                        </td>
                    </tr>
                );
            });
        }

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
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Sex</th>
                        <th>Contact</th>
                        <th>UpdatedAt</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {workerItems}
                    </tbody>
                </Table>
                <WorkerEditorContainer created/>
            </div>
        );
    }
}

const mapStateToProps = (store) => ({
    workers: store.workers.list,
    page: store.workers.page,
    pageCount: store.workers.pageCount,
})

export default connect(
    mapStateToProps
)(WorkersTable)


