/**
 * Created by PC10 on 06.12.2016.
 */
import {applyMiddleware, createStore} from 'redux'

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from './reducers'

const NODE_ENV = process.env.NODE_ENV || "development";
let middleware = [promise(), thunk];

if (NODE_ENV !== 'production') {
    middleware = [...middleware, logger()];
}

export default createStore(reducer, applyMiddleware(...middleware));