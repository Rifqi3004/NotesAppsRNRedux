//import axios to handle request api from backend express js
import axios from 'axios'

//function get all dara notes
export const getNotes = () => ({
    type : 'GET_NOTES',
    payload : axios.get('http://192.168.0.62:5000/getNotes')
})

//function add note 
export const addNote = (dataNote)=>({
    type: 'ADD_NOTE',
    payload : axios.post('http://192.168.0.62:5000/postNote',dataNote)
})


//function edit/upate note
export const editNote = (dataNote)=>({
    type: 'EDIT_NOTE',
    payload : axios.put('http://192.168.0.62:5000/updateNote',dataNote)
})

//function delete note
export const deleteItemNote = (idNote) => ({
    type : 'DELETE_ITEM_NOTE',
    payload : axios.delete('http://192.168.0.62:5000/deleteItemNote/'+idNote)
})

//function add selected note to delete
export const addSelectedDelete = (idNote) => ({
    type : 'ADD_SELECTED_DELETE',
    payload : idNote
})


//function remove selected note delete
export const removeSelectedDelete = (idNote) => ({
    type : 'REMOVE_SELECTED_DELETE',
    payload : idNote
})

//function cancel delect selected
export const cancelSelectedDelete = () => ({
    type : 'CANCEL_SELECTED_DELETE'
})

//function delete with selected
export const deleteSelectedNote = (idNote) => ({
    type : 'DELETE_SELECTED_NOTE',
    payload : axios.delete('http://192.168.0.62:5000/deleteItemNote/'+idNote)
})