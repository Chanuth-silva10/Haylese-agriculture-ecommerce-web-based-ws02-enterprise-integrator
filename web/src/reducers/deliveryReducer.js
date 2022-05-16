let initstate = {
    delivery : {},
    editDelivery :  {},
    updatedDelivery : {}

}

export default function (state= initstate, action){
    switch(action.type) {
        case "ADD_DELIVERY":
            return {
                ...state,
                delivery : action.payload 
            }
        case "DELETE_DELIVERY":
            return {
                ...state
                // deleteDelivery : [action.payload, ...state.deleteDelivery]
            }
        case "EDIT_DELIVERY_CACHE":
            return  {
                ...state,
                editDelivery : action.payload
            }
        case "UPDATE_DELIVERY":
            return {
                ...state,
                updatedDelivery :action.payload
            }            
         default:
             return state;   
    }
}

