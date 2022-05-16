import { combineReducers } from 'redux'; //importing combineReducers method from redux module
import orderReducer from './orderReducer';
import usersReducer from './usersReducer'
import deliveryReducer from './deliveryReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import paymentReducer from './paymentReducer';

export default combineReducers({ // combining all the reducers at the root reducer which is used to create the redux store
    users: usersReducer,
    orders:orderReducer,
    delivery:deliveryReducer,
    cart: cartReducer,
    products: productReducer,
    payment : paymentReducer
    
})
