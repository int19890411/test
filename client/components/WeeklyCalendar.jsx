"use strict";
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    selectHour,
    clearHour,
    setDrag,
    init,
    clear,
    save,
    clearAllDay,
    selectAllDay
} from '../actions/calendarActions.js'

import Button from 'react-bootstrap/lib/Button';

function minutesToHours(m) {
    return Math.floor(m / 60);
}

function serialize(data) {
    var sData = {};
    for (let day in data) {
        sData[day] = [];
        for (let hour = 0; hour < 24; hour++) {
            sData[day].push(isHourSelected(data[day], hour));
        }
    }
    return sData
}

function deserialize(data) {
    var sData = {};
    for (let day in data) {
        sData[day] = [];
        for (let i = 0, bt = 0; i < data[day].length; i++) {
            if (!data[day][i + 1] && data[day][i]) {
                sData[day].push({
                    bt: bt,
                    et: (i + 1) * 60 - 1
                });
            }
            if (data[day][i + 1] && !data[day][i]) {
                bt = (i + 1) * 60;
            }
        }
    }
    return sData
}

function isHourSelected(dayData, currentHour) {
    for (var obj of dayData) {
        if (minutesToHours(obj.bt) <= currentHour && currentHour <= minutesToHours(obj.et)) {
            return true;
            break;
        }
    }
    return false;
}
class WeeklyCalendar extends Component {
    componentWillMount() {
        if (this.props.inputData) {
            this.props.dispatch(init(serialize(this.props.inputData)));
        }
    }

    save(e) {
        let {onSave} = this.props;
        if (typeof onSave == "function") {
            onSave(deserialize(this.props.data));
        }
        e.preventDefault()
    }

    clear() {
        this.props.dispatch(clear());
    }

    onClickAllDay(checkedState, day) {
        if (checkedState) {
            this.props.dispatch(clearAllDay(day));
        } else {
            this.props.dispatch(selectAllDay(day));
        }
    }

    onMouseEnter(e) {
        const day = e.target.getAttribute("data-day");
        const hour = parseInt(e.target.getAttribute("data-hour"));
        if (this.props.dragging) {
            this.props.dispatch(selectHour(day, hour));
        }
    }

    onMouseUp(e) {
        if (this.props.dragging) {
            this.props.dispatch(setDrag(false));
        }
        e.preventDefault()
    }

    onMouseDown(e) {
        const day = e.target.getAttribute("data-day");
        const hour = parseInt(e.target.getAttribute("data-hour"));
        const selected = e.target.getAttribute("data-selected");
        if (selected) {
            //this.clearHour(day, hour);
            this.props.dispatch(clearHour(day, hour));
        } else {
            this.props.dispatch(selectHour(day, hour));
            this.props.dispatch(setDrag(true));
        }
        e.preventDefault()
    }

    render() {
        let {data, pending} = this.props;
        let bodyTable = [];
        for (let day in data) {
            let row24h = [];
            let selectedCount = 0;
            for (let hour = 0; hour < 24; hour++) {
                let selectedClassName;
                if (data[day][hour]) {
                    selectedClassName = "selected";
                    selectedCount++;
                }
                row24h.push(
                    <td
                        key={hour}
                        data-day={day}
                        data-hour={hour}
                        data-selected={selectedClassName}
                        onMouseEnter={::this.onMouseEnter}
                        onMouseDown={::this.onMouseDown}
                        onMouseUp={::this.onMouseUp}
                        className={selectedClassName}>
                    </td>
                );
            }
            let isAllDay = selectedCount >= 24;

            bodyTable.push(<tr key={day}>
                <td className={isAllDay ? "name selected" : "name"}>{day}</td>
                <td className="all-day"
                    onClick={this.onClickAllDay.bind(this, isAllDay, day)}>
                    <span className={isAllDay ? "glyphicon glyphicon-check" : undefined}></span>
                </td>
                {row24h}
            </tr>);
        }

        return (
            <div className="weekly">
                <table>
                    <tbody>
                    <tr className="th">
                        <td rowSpan="2"></td>
                        <td rowSpan="2">ALL<br></br>DAY</td>
                        <td colSpan="3" className="time">00:00</td>
                        <td colSpan="3" className="time">03:00</td>
                        <td colSpan="3" className="time">06:00</td>
                        <td colSpan="3" className="time">09:00</td>
                        <td colSpan="3" className="time">12:00</td>
                        <td colSpan="3" className="time">15:00</td>
                        <td colSpan="3" className="time">18:00</td>
                        <td colSpan="3" className="time">21:00</td>
                    </tr>
                    <tr className="space">
                        <td colSpan="3"></td>
                        <td colSpan="3"></td>
                        <td colSpan="3"></td>
                        <td colSpan="3"></td>
                        <td colSpan="3"></td>
                        <td colSpan="3"></td>
                        <td colSpan="3"></td>
                        <td colSpan="3"></td>
                    </tr>
                    {bodyTable}
                    </tbody>
                </table>
                <div className="pull-right weekly-buttons">
                    <Button onClick={::this.clear}
                            bsStyle="warning">Clear</Button>
                    <Button disabled={pending}
                            onClick={::this.save}
                            bsStyle="primary">
                        {pending ? 'Pending...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect((store) => ({
    data: store.calendar.data,
    pending: store.calendar.pending,
    dragging: store.calendar.dragging,
}), null, null, {pure: false})(WeeklyCalendar);

