
let initialState = {
    payment : ''
}

export default function(state=initialState,action){
    switch(action.type){
        case 'ADD_PAYMENT' :
            return ({
                ...state,
                payment: action.payload
            })
        default :
            return state;    
    }
}