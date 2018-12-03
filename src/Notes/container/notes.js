import Notes from "../screen/Notes"
import { connect } from 'react-redux'
import {deleteItemNote, getNotes, cancelSelectedDelete, deleteSelectedNote} from "../../Public/redux/actions/notes"
const mapStateToProps = (state) => ({
    data : state.notes,
})

const mapDispatchToProps = (dispatch )=> ({    
    getNotes : () => dispatch(getNotes()),
    deleteItemNote : (idNote) => dispatch(deleteItemNote(idNote)),
    cancelSelectedDelete : () => dispatch(cancelSelectedDelete()),
    deleteSelectedNote : (idNote) => dispatch(deleteSelectedNote(idNote))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes)