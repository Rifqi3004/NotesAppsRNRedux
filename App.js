import React from 'react'
import { Provider, connect } from 'react-redux'
import store from "./src/Public/redux/store"
import {reduxifyNavigator} from 'react-navigation-redux-helpers'
import Navigator from './src/Public/navigator/index'

const App = reduxifyNavigator(Navigator, "root")
const MapstoProps = (state) => ({
    state : state.nav
})

const AppWithNavigator = connect(MapstoProps)(App)

class Root extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <AppWithNavigator />
            </Provider>
        )
    }
}

export default Root