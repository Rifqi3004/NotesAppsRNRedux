import {  createStore } from 'redux'
import reducers from "./reducers/index"
import midlewares from "./middleware"
export default createStore(
    reducers,
    midlewares
)