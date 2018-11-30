import React from 'react'
import {View, ActivityIndicator} from 'react-native'
import { Provider, connect } from 'react-redux'
import {store, persistor} from "./src/Public/redux/store"
import {reduxifyNavigator} from 'react-navigation-redux-helpers'
import Navigator from './src/Public/navigator/index'
import { PersistGate } from 'redux-persist/integration/react'

const App = reduxifyNavigator(Navigator, "root")
const MapstoProps = (state) => ({
    state : state.nav
})

const AppWithNavigator = connect(MapstoProps)(App)

renderLoading = () => (
    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
)

class Root extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                     <AppWithNavigator />
                </PersistGate>
               
            </Provider>
        )
    }
}

export default Root