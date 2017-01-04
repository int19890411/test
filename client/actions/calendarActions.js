/**
 * Created by PC10 on 07.12.2016.
 */
import axios from 'axios'

export function selectHour(day, hour) {
    return {
        type: "SELECT_HOUR",
        payload: {
            day,
            hour
        }
    }
}

export function clearHour(day, hour) {
    return {
        type: "CLEAR_HOUR",
        payload: {
            day,
            hour
        }
    }
}

export function setDrag(value) {
    return {
        type: "SET_DRAG",
        payload: {value}
    }
}

export function init(inputData) {
    return {
        type: "INIT",
        payload: {data: inputData}
    }
}

export function clearAllDay(day) {
    return {
        type: "CLEAR_ALL_DAY",
        payload: {day}
    }
}
export function selectAllDay(day) {
    return {
        type: "SELECT_ALL_DAY",
        payload: {day}
    }
}
export function clear() {
    return {
        type: "CLEAR"
    }
}

export function saveToDB(data) {
    return {
        type: "SAVE",
        payload: axios.post(`/api/calendar/save`, data),
    }
}