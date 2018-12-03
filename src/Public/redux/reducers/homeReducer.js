const initialState = {
    grid : false
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_HIDE_GRID':
            return{
                grid : action.payload
            }
            break;
    
        default:
           return state
    }
}

export default homeReducer