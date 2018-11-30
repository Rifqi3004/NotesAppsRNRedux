import EditScreen from "../../Notes/screen/edit"
import { connect } from 'react-redux'
import { homeaction } from '../redux/actions/home'
import {addNotes,editNotes} from "../redux/actions/notes"
const homeProps = (state) => ({
    data :state.home,
})
var id = 1;
const mapDispatchToProps = (dispatch )=> ({    
    editNote : (thisid,date,notes) => dispatch(editNotes(thisid,date,notes))
});

export default connect(homeProps, mapDispatchToProps)(EditScreen)