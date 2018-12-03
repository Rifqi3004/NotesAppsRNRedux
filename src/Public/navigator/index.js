import { createStackNavigator, createNavigationContainer } from 'react-navigation'
import Notes from "../../Notes/container/notes"
import AddNotes from "../../Notes/container/addNotes"
import EditNote from "../../Notes/container/editNote"

const Stack = createStackNavigator(
    {
        Notes : {
            screen : Notes
        },
        AddNotes : {
            screen : AddNotes
        },
        EditNote : {
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