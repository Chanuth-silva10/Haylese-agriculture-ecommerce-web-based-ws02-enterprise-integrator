import * as actionType from '../constants/productConstants'
import axios from 'axios';
import {ip} from '../utils/hostAddress';

//Get all products details 

export const getProducts = () => (dispatch) => {
    try{
        dispatch({type: actionType.GET_PRODUCTS_REQUEST});

        axios.get(`${ip}/products`).then((res) => {
            console.log(res.data);
            dispatch({
                type: actionType.GET_PRODUCTS_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err)
            console.log('error in getproduct')
        })

    }catch(error){
        dispatch({
            type: actionType.GET_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//Get Product details according to its 'id'

export const getProductDetails = (id) => (dispatch) => {
    try{
        dispatch({type: actionType.GET_PRODUCT_DETAILS_REQUEST});
        console.log(id);
        axios.get(`${ip}/products/${id}`).then((res) => {
        dispatch({
                type: actionType.GET_PRODUCT_DETAILS_SUCCESS,
                payload: res.data
            })
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    }catch(error){
        dispatch({
            type: actionType.GET_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// remove product details 
export const removeProductDetails = () => (dispatch) => {
    dispatch({
        type: actionType.GET_PRODUCT_DETAILS_RESET
    })
}