import { combineReducers } from 'redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'
import Navigator from "../../navigator/index"
import axios from 'axios'
import { delSelect } from '../actions/notes';

const reducerNavigator = createNavigationReducer(Navigator)
const gridreduser = (state=false, action) => {
    switch (action.type) {
        case 'SHOW_HIDE_GRID':
            return{
                ...state,
                state : action.payload
            }
            break;
    
        default:
           return state
    }
}

const selectDel = (state=[], action) => {
    switch(action.type){
        case 'ADD_ITEM' :
            return [
                ...state, action.payload
            ]
        break
        case 'DEL_ITEM' :
            return state.filter((state) => state.id != action.payload.id)
        break
        default :
        return state
    }
}

const homereducer = (state=[], action)=>{
    switch (action.type) {
        // case  'GET_NOTES' :
        //     return {
        //         ...state,
        //             state : axios.get('http://192.168.0.62:5000/getdata')
               
        //     }
        // break;

        case "ADD_NOTES":
            return [
                ...state, action.payload
                ]
        break;
        case "EDIT_NOTES":
        // return state.map((stat) => console.log(stat.notes))
          return state.map((state) => (state.id == action.payload.id)? action.payload : state)
       
        
        break;

        case "DELETE_SELECT_NOTES":
        // return state.map((stat) => console.log(stat.notes))
          return state.filter((state) => state.id != action.payload.id)
       
        
        break;

        case "DELETE_NOTES":
          return []             
                      
          
        break;
    
    
        default:
            return state
    }
}

const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('HomeScreen'));

const navReducer = (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);
  return nextState || state;
};

const reducer = combineReducers(
    {
        nav : navReducer,
        home : homereducer,
        grid : gridreduser,
        item : selectDel
    }
)
export default reducer