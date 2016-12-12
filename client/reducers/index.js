/**
 * Created by PC10 on 06.12.2016.
 */

import {combineReducers} from 'redux';
import workers from './workers';
import times from './times';
import login from './login';

const combineReduser = combineReducers({
    workers,
    times,
    login
})

export default combineReduser