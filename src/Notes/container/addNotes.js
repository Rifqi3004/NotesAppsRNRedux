import AddNotes from "../screen/AddNotes"
import { connect } from 'react-redux'
import {addNote, editNote} from "../../Public/redux/actions/notes"
const mapStateTorPros = (state) => ({
    data :state.notes,
})

const mapDispatchToProps = (dispatch )=> ({    
    addNote : (dataNote) => dispatch(addNote(dataNote)),
    editNote : (dataNote) => dispatch(editNote(dataNote)),    
    back : () => dispatch({
        type : 'Navigation/POP'
    }) 
});

export default connect(mapStateTorPros, mapDispatchToProps)(AddNotes)