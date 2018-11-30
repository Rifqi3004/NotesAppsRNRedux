import { applyMiddleware } from 'redux'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

const midleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
)
export default applyMiddleware(midleware, thunk, logger, promise())

