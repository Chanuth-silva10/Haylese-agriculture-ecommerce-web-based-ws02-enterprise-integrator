import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';
import {ip} from '../utils/hostAddress'

//Add item to the cart according to id and the selected qty

export const addToCart = (id , qty) => (dispatch, getState) => {
    return new Promise((resolve,reject) => {
        axios.get(`${ip}/products/${id}`).then((res) => {
            console.log(res.data.itemName);
                dispatch({
                    type: actionTypes.ADD_TO_CART,
                    payload: {    
                        product: res.data._id,
                        name: res.data.itemName,
                        imageUrl: res.data.imageUrl,
                        price:res.data.price,
                        countInStock: res.data.countInStock,
                        qty ,
                        farmerId:res.data.farmerId,
                    }
                });
                resolve("Added item to cart");
        }).catch(err => {
            console.log(err);
            reject("Adding failed");
        })
    })

};

//Remove items from the cart accorfing to its id

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
}