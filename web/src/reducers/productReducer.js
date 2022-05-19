import * as actionType from '../constants/productConstants';
let initstate = {
    loading: true,
    products: [],
    product: {},
    productWantTOUpdate:{},
    error: null,
    update:false,
}

export default function (state = initstate, action) {
    console.log(action.payload)
    switch(action.type){
        //get all products
        case actionType.GET_PRODUCTS_REQUEST:
            return{
                ...state,
                loading: true,
                products: []
            }
        case actionType.GET_PRODUCTS_SUCCESS:
            return{
                ...state,
                loading: false,
                products: action.payload
            }
        case actionType.GET_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //get product details
        case actionType.GET_PRODUCT_DETAILS_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actionType.GET_PRODUCT_DETAILS_SUCCESS:
            return{
                ...state,
                loading: false,
                product: action.payload
            }
        case actionType.GET_PRODUCT_DETAILS_FAIL:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        case actionType.GET_PRODUCT_DETAILS_RESET:
            return{
                ...state,
                product: {}
            }
        case 'ADD_PRODUCT':
            return{
                ...state,
                products:[action.payload,...state.products]
            }
        case 'PRODUCT_WANT_TO_UPDATE':
            return{
                ...state,
                update:true,
                productWantTOUpdate:action.payload,
            }
        case 'UPDATE_STATE':
            return{
                ...state,
                update:false
            }
        case 'FARMER_UPDATE_PRODUCT':
            return{
                ...state,
                productWantTOUpdate: null,
                products: [state.products.filter(product=> product._id!=action.payload._id),action.payload],
                update:false,
            }
        case 'DELETE_PRODUCT':
            return{
                ...state,
                products:state.products.filter(product=> product._id!=action.payload)
            }
        default:
            return state;
    }
};

