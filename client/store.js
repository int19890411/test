/**
 * Created by PC10 on 06.12.2016.
 */
import {applyMiddleware, createStore} from 'redux'

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from './reducers'

const middleware = applyMiddleware(promise(), thunk, logger())

export default createStore(reducer, middleware);