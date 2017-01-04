/**
 * Created by PC10 on 06.12.2016.
 */

const initialState = {
    data: {
        "mo": get24Array(false),
        "tu": get24Array(false),
        "we": get24Array(false),
        "th": get24Array(false),
        "fr": get24Array(false),
        "sa": get24Array(false),
        "su": get24Array(false),
    },
    dragging: false,
    pending: false,
    error: null
}
function get24Array(bool) {
    var array = [];
    for (var i = 0; i < 24; i++) {
        array.push(bool);
    }
    return array
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state, data: action.payload.data
            };
        case 'SAVE_PENDING':
            return {...state, pending: true}
        case 'SAVE_REJECTED':
            return {...state, pending: false, error: action.payload}
        case 'SAVE_FULFILLED':
            return {...state, pending: false}
        case 'CLEAR':
            return {
                ...state, data: initialState.data
            };
        case 'CLEAR_ALL_DAY':
            return {
                ...state, data: {
                    ...state.data,
                    [action.payload.day]: get24Array(false)
                }
            };
        case 'SELECT_ALL_DAY':
            return {
                ...state, data: {
                    ...state.data,
                    [action.payload.day]: get24Array(true)
                }
            };
        case 'SET_DRAG':
            return {...state, dragging: action.payload.value};
        case 'SELECT_HOUR':
            var day = action.payload.day;
            var hour = parseInt(action.payload.hour);
            var nDay = state.data[day].map((obj, index) => {
                if (index == hour) {
                    return true;
                }
                return obj;
            })
            return {...state, data: {...state.data, [day]: nDay}};
        case 'CLEAR_HOUR':
            var day = action.payload.day;
            var hour = parseInt(action.payload.hour);
            var nDay = state.data[day].map((obj, index) => {
                if (index == hour) {
                    return false;
                }
                return obj;
            })
            return {...state, data: {...state.data, [day]: nDay}};
        default:
            return state
    }
}

function normalizeIntervals(array) {
    array.sort((a, b) => {
        if (a.bt < b.bt) {
            return -1;
        }
        if (a.bt > b.bt) {
            return 1;
        }
        return 0;
    })

    for (var i = 0; i < array.length; i++) {
        if (array[i + 1] && array[i].et == array[i + 1].bt - 1) {
            array[i].et = array[i + 1].et;
            array.splice(i + 1, 1);
            i--;
        }
    }
}

export default reducer