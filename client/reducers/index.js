/**
 * Created by PC10 on 06.12.2016.
 */

import {combineReducers} from 'redux';
import workers from './workers';
import times from './times';

const combineReduser = combineReducers({
    workers,
    times
})

export default combineReduser