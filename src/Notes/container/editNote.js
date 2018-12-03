import EditNote from "../screen/EditNote"
import { connect } from 'react-redux'
import {editNote} from "../../Public/redux/actions/notes"
const mapStateTorPros = (state) => ({
    data :state.notes,
})

const mapDispatchToProps = (dispatch )=> ({    
    editNote : (dataNote) => dispatch(editNote(dataNote)),    
});

export default connect(mapStateTorPros, mapDispatchToProps)(EditNote)