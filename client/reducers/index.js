/**
 * Created by PC10 on 06.12.2016.
 */

import {combineReducers} from 'redux';
import workers from './workers';
import times from './times';
import auth from './auth';
import calendar from './calendar';

const combineReduser = combineReducers({
    workers,
    times,
    calendar,
    auth
})

export default combineReduser