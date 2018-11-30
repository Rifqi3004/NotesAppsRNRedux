import NoteScreen from "../../Notes/screen/index"
import { connect } from 'react-redux'
import { homeaction } from '../redux/actions/home'
import {addNotes,editNotes, delNotes} from "../redux/actions/notes"
const homeProps = (state) => ({
    data :state.home,
})
var id = 1;
const mapDispatchToProps = (dispatch )=> ({    
    addNote : (date,notes) => dispatch(addNotes(id++,date,notes)),
    editNote : (thisid,date,notes) => dispatch(editNotes(thisid,date,notes)),    
});

export default connect(homeProps, mapDispatchToProps)(NoteScreen)