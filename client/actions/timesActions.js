/**
 * Created by PC10 on 07.12.2016.
 */
import axios from 'axios'

export function fetchTimes(page) {
    return {
        type: "FETCH_TIMES",
        payload: axios.get("/api/times/", {params: {page: page}})
    }
}
export function saveTime(time) {
    return {
        type: "SAVE_TIME",
        payload: axios.post(`/api/times/${time.id}/save`, time)
    }
}

export function createTime(obj) {
    return {
        type: "CREATE_TIME",
        payload: axios.post(`/api/times/create`, obj)
    }
}

export function deleteTime(timeId) {
    return {
        type: "REMOVE_TIME",
        payload: axios.post(`/api/times/${timeId}/delete`),
        meta: {timeId: timeId},
    }
}
