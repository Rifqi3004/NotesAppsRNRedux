
export const deleleteNotes =() => ({
    type: 'DELETE_NOTES'
    
})
export const deleteSelect = (id) => ({
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

export const deleteItem = (id) => ({
    type : 'DELETE_ITEM',
    payload : {
        id : id
    }
})