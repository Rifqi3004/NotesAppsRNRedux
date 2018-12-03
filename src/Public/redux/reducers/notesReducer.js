const initialState = {
  grid : false,
  notes : [],
  itemDelete : [],
  isLoading : false,
  isFinish : false,
  isError : false
}

export const notesReducer =(state = initialState, action) => {
    switch (action.type) {
      //get all Notes 
        case "GET_NOTES_PENDING" : 
          return {
            ...state, isLoading : true
          }

        case "GET_NOTES_FULFILLED" : 
          return {
            ...state, isLoading : false, isFinish : true,
            notes : action.payload.data
        }

        case "GET_NOTES_REJECTED" : 
          return {
            ...state, isError : true,

          }

    //add Note
        case "ADD_NOTE_PENDING" :
         return {
           ...state,
           isLoading : true
         }
      
        case "ADD_NOTE_FULFILLED":
            return {
                ...state,isLoading : false, isFinish : true,
                 notes : [action.payload.data, ...state.notes]
                }
        break;

        case "ADD_NOTE_REJECTED" :
            return {
              ...state, isError : true
            }

    //editNote

        case "EDIT_NOTE_PENDING" :
            return {
              ...state,
              isLoading : true
            }         
    
        case "EDIT_NOTE_FULFILLED":
               return {
                   ...state,isLoading : false, isFinish : true,
                    notes : state.notes.map((data) => 
                          (data.id == action.payload.data.id)?
                           action.payload.data :
                           data
                          )
                   }
           break;
   
        case "EDIT_NOTE_REJECTED" :
               return {
                 ...state, isError : true
               }

    //delete Item Note
               
      case "DELETE_ITEM_NOTE_PENDING" :
            return {
              ...state,
              isLoading : true
            }         

        case "DELETE_ITEM_NOTE_FULFILLED":
              return {
                  ...state,isLoading : false, isFinish : true,
                    notes : state.notes.filter((data) => data.id != action.payload.data.id )
                  }
          break;

        case "DELETE_ITEM_NOTE_REJECTED" :
              return {
                ...state, isError : true
              }

      //add selected Note
        case "ADD_SELECTED_DELETE" :
            return {
              ...state,
              itemDelete : [...state.itemDelete, action.payload]
            }
      //remove selected note
        case "REMOVE_SELECTED_DELETE" : 
            return {
              ...state,
              itemDelete : state.itemDelete.filter((item) => item != action.payload)
            }
      //camcel delete selected note
        case "CANCEL_SELECTED_DELETE" :
            return {
              ...state, itemDelete : []
            }

        //delete selected note
        case "DELETE_SELECTED_NOTE_PENDING" :
            return {
              ...state,
              isLoading : true
            }         

        case "DELETE_SELECTED_NOTE_FULFILLED":
              return {
                  ...state,isLoading : false, isFinish : true,
                    notes : state.notes.filter((data) => data.id != action.payload.data.id ),
                    itemDelete : state.itemDelete.filter((item) => item != action.payload.data.id)
                  }
          break;

        case "DELETE_ITEM_NOTE_REJECTED" :
              return {
                ...state, isError : true
              }

        default:
            return state
    }
}
