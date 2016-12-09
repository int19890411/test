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

        case 'FETCH_TIMES_PENDING':
            return {...state, pending: true}
        case 'FETCH_TIMES_REJECTED':
            return {...state, pending: false, error: action.payload}
        case 'FETCH_TIMES_FULFILLED':
            return {
                ...state,
                pending: false,
                list: action.payload.data.times,
                page: action.payload.data.page,
                pageCount: action.payload.data.pageCount
            }

        case 'SAVE_TIME_PENDING':
            return {...state, pending: true}
        case 'SAVE_TIME_REJECTED':
            return {...state, pending: false, error: action.payload}
        case 'SAVE_TIME_FULFILLED':
            return {
                ...state, pending: false, list: state.list.map((obj) => {
                    if (obj.id == action.payload.data.id) {
                        return _.assign({}, obj, action.payload.data);
                    } else {
                        return obj;
                    }
                })
            }

        case 'CREATE_TIME_PENDING':
            return {...state, pending: true}
        case 'CREATE_TIME_REJECTED':
            return {...state, pending: false, error: action.payload}
        case 'CREATE_TIME_FULFILLED':
            return {
                ...state, pending: false, list: _.concat(state.list, action.payload.data)
            }

        case 'REMOVE_TIME_PENDING':
            return {...state, pending: true}
        case 'REMOVE_TIME_REJECTED':
            return {...state, pending: false, error: action.payload}
        case 'REMOVE_TIME_FULFILLED':
            return {
                ...state,
                pending: false,
                list: state.list.filter((time) => {
                    return time.id != action.meta.timeId
                })
            }

        default:
            return state
    }
}

export default reducer