import { combineReducers } from 'redux'
import Navigator from "../../navigator/index"
import {notesReducer} from "./notesReducer"
import { createNavigationReducer } from 'react-navigation-redux-helpers';

const navReducer = createNavigationReducer(Navigator)

const reducers = combineReducers(
    {
        nav : navReducer,
        notes : notesReducer
    }
)
export default reducers