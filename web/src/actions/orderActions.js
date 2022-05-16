import axios from 'axios'
import {ip} from '../utils/hostAddress'

export const addOrder = (cartItems, id, TotalAmount) => dispatch => {
    return new Promise((resolve, reject) => {
        console.log('order B');
        const itemList = cartItems.map(cartItem => { return { itemId: cartItem.product, itemName: cartItem.name, itemcolor: '', qty: Number(cartItem.qty), amount: cartItem.price, imgUrl: cartItem.imageUrl,farmerId:cartItem.farmerId } });
        let order = {
            item: [...itemList],
            userId: id,
            TotalAmount: TotalAmount,
            date: new Date(),
            status: 'payment not done'
        }
        axios.post(`${ip}/orders/add`, order).then((res) => {
            console.log('res id',res.data._id);
            dispatch({ type: 'ADD_ORDER', payload: order })
            resolve(res.data._id)
        }).catch(err => {
            console.log(err)
            reject(err)
        });
    })
}
export const getOrder = (userid) => dispatch => {
    return new Promise((resolve, reject) => {
    if (userid) {
        axios.get(`${ip}/orders/${userid}`).then((res) => {
            console.log('order added');
            console.log(res.data)
            dispatch({ type: 'GET_ORDER', payload:res.data })
            resolve(res.data)
        }).catch(err => {
            console.log(err)
            reject("get orders reject")
        });
    }
    else{
        dispatch({ type: 'GET_ORDER', payload: null });
        reject("get orders reject")
    }

})}
export const getAllOrders = (userid) => dispatch => {
    console.log(userid)
    return new Promise((resolve, reject) => {
    if (userid) {
        axios.get(`${ip}/orders`).then((res) => {
            console.log('order added');
            console.log(res.data)
            dispatch({ type: 'GET_All_ORDERS', payload: res.data })
            resolve(res.data)
        }).catch(err => {
            console.log(err)
            reject(err)
        });
    }
    else
        dispatch({ type: 'GET_ORDER', payload: null });
})}

export const updateOrderStatus = (orderId) => dispatch => {
    console.log('update order status orderId: ', orderId);
    
        axios.post(`${ip}/orders/orderStatus/${orderId}`).then((res) =>{
            console.log('order updated');
            dispatch({type : 'UPDATE_ORDER_STATUS', payload : res.data})
        }).catch(err => {
            console.log('err: ', err);
        })
    
}
