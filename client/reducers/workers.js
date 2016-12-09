/**
 * Created by PC10 on 06.12.2016.
 */
import _ from 'lodash';

const initialState = {
    list: [],
    page: 1,
    pageCount: 1,
    pending: false,
    error: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WORKERS_PENDING':
            return {...state, pending: true}
            break;
        case 'FETCH_WORKERS_REJECTED':
            return {...state, pending: false, error: action.payload}
            break;
        case 'FETCH_WORKERS_FULFILLED':
            return {
                ...state,
                pending: false,
                list: action.payload.data.workers,
                page: action.payload.data.page,
                pageCount: action.payload.data.pageCount
            }
            break;

        case 'SAVE_WORKER_PENDING':
            return {...state, pending: true}
            break;
        case 'SAVE_WORKER_REJECTED':
            return {...state, pending: false, error: action.payload}
            break;
        case 'SAVE_WORKER_FULFILLED':
            let fetchedWorker = action.payload.data;
            if (_.some(state.list, {id: fetchedWorker.id})) {
                return {
                    ...state, pending: false, list: state.list.map((obj) => {
                        if (obj.id == fetchedWorker.id) {
                            return _.assign({}, obj, fetchedWorker);
                        } else {
                            return obj;
                        }
                    })
                }
            } else {
                return {
                    ...state, pending: false, list: _.concat(state.list, fetchedWorker)
                }
            }
            break;

        case 'REMOVE_WORKER_PENDING':
            return {...state, pending: true}
            break;
        case 'REMOVE_WORKER_REJECTED':
            return {...state, pending: false, error: action.payload}
            break;
        case 'REMOVE_WORKER_FULFILLED':
            return {
                ...state,
                pending: false,
                list: state.list.filter((worker) => {
                    return worker.id != action.meta.workerId
                })
            }
            break;

        default:
            return state
    }
}

export default reducer