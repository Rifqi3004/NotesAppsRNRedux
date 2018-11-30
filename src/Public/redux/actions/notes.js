export const addNotes = (id,date,notes)=>({
    type: 'ADD_NOTES',
    payload : {
        id : id,
        date : date,
        notes : notes
    }
})

export const editNotes =(id, date, notes) => ({
    type: 'EDIT_NOTES',
    payload : {
            id : id,
            date : date,
            notes : notes
       
    }
})
export const delNotes =() => ({
    type: 'DELETE_NOTES'
    
})
export const delSelect = (id) => ({
    type : 'DELETE_SELECT_NOTES',
    payload : {
        id : id
    }
})

export const addItem = (id) => ({
    type : 'ADD_ITEM',
    payload : {
        id : id
    }
})

export const delItem = (id) => ({
    type : 'DEL_ITEM',
    payload : {
        id : id
    }
})