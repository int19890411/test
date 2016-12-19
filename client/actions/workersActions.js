/**
 * Created by PC10 on 07.12.2016.
 */
import axios from 'axios'


// thunk middleware
/*export function removeWorker(workerId) {
 return function (dispatch) {
 dispatch({type: "REMOVE_WORKER_PENDING"});
 axios.post(`/workers/${workerId}/delete`).then(function (response) {
 dispatch({type: "REMOVE_WORKER_FULFILLED", payload: response.data, workerId: workerId});
 }).catch(function (err) {
 dispatch({type: "REMOVE_WORKER_REJECTED", payload: err});
 });
 }
 }*/

//promise() middleware
export function fetchWorkers(page) {
    return {
        type: "FETCH_WORKERS",
        payload: axios.get("/api/workers", {params: {page: page}})
    }
}
export function saveOrCreateWorker(worker) {
    return {
        type: "SAVE_WORKER",
        payload: axios.post(`/api/workers/${worker.id}/save`, worker)
    }
}

export function removeWorker(workerId) {
    return {
        type: "REMOVE_WORKER",
        payload: axios.post(`/api/workers/${workerId}/delete`),
        meta: {workerId: workerId},
    }
}
