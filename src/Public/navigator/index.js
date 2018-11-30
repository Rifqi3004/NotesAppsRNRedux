import { createStackNavigator, createNavigationContainer } from 'react-navigation'
import Home from "../container/home"
import Note from "../container/note"
import EditNote from "../container/edit"

const Stack = createStackNavigator(
    {
        HomeScreen : {
            screen : Home
        },
        NoteScreen : {
            screen : Note
        },
        EditScreen : {
            screen : EditNote
        }
    },
    {
        headerMode : 'none',
        navigationOptions : {
            header : {
                visible : false
            }
        }
    }
)

export default createNavigationContainer(Stack)