import axios from 'axios';
import {ip} from '../utils/hostAddress'

export function addPayment(values) {
    console.log()
    return (dispatch) =>{
        axios.post(`${ip}/payment/add`, values)
        .then((res) => {
            dispatch({
                type : 'ADD_PAYMENT',
                payload : values,
            });
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}