import * as actionType from '../constants/cartConstants'

let initstate = {
    cartItems: [] 
}

export default function (state = initstate, action) {
    switch (action.type) {
        case actionType.ADD_TO_CART:
            console.log('Product added to cart')
            console.log(action.payload);
            const existItem = state.cartItems.find((x) => x.product === action.payload.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product == existItem.product ? action.payload : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                }
            }
        case actionType.REMOVE_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        case "REMOVE_CART":
            return{
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}