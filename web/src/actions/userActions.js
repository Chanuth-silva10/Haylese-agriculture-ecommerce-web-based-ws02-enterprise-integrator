import axios from 'axios' //importing axios module
import jwt from 'jsonwebtoken'; //importing json web token module
import hashPassword from 'password-hash' //importing password-hash module
import {ip} from '../utils/hostAddress' //ip address - wso2

// add new user action
export const addUser = user => dispatch => {
    return new Promise((resolve,reject) => { //creating a new promise
    user.password = hashPassword.generate(user.password);
    console.log(user);
    axios.post(`${ip}/users`,user).then((res)=>{ // calling the post server call of the set url while passing the user object param as data
        const {token} = res.data; //destructuring the token object returned from the response data
    if(token){  // checking if the token is not null
        localStorage.setItem('jwtToken',token);  // setting the token with the key jwtToken in the localstorage of the browser
        dispatch({ //setting the dispatch action type and payload which will be invoked as a callback
            type: "ADD_USER", 
            payload: user,
            currentUser: jwt.decode(token)
        })
    }
    else
        dispatch({ //setting the dispatch action type and payload which will be invoked as a callback
            type:"ADD_USER",
            payload: res.data
        })
        resolve("done"); //resolving the promise
    }).catch(err=>{
        console.log(err);
        reject(err); //rejecting the promise with error
    });
    });
}


// login() action
export const login = credentials => dispatch => {
    return new Promise((resolve,reject) => {
        if(credentials.id){
            dispatch({
                type:"LOGIN",
                payload: credentials
            })
        }
        else{
        axios.post(`${ip}/users/${credentials.email}`,credentials).then((res) => {
            const {token} = res.data;
            if(token){
                localStorage.setItem('jwtToken',token);
                const currentUser = jwt.decode(token);
                if(res.status === 200){
                dispatch({
                    type: "LOGIN",
                    payload: currentUser
                })
            }
            }
            else{
                console.log("authError")
                dispatch({
                    type: "LOGIN",
                    payload: res.data
                })
            }
            resolve("done");
        }).catch(err => {
            console.log(err);
            reject(err);
        })
        }
    })

}

// delete user action
export const deleteUser = (id) => dispatch => {
    console.log(id);
    return new Promise((resolve,reject) => {
        axios.delete(`${ip}/users/${id}`).then((res)=>{
            localStorage.removeItem('jwtToken'); //removing the token using it's key
            localStorage.removeItem('cart'); //removing the cart using it's key
            dispatch({
                type: "LOGOUT"
            })
            dispatch({
                type:"REMOVE_CART"
            })
            resolve("done");
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    })
}


// update user action
export const updateUser = (id,user) => dispatch => {
    console.log(id,user);
    return new Promise((resolve,reject) => {
        axios.put(`${ip}/users/${id}`,user).then((res)=>{
            const {token, newUser} = res.data;
            if(token){
                localStorage.setItem('jwtToken',token);
                const currentUser = jwt.decode(token);
                if(res.status === 200){ //checking if the status property of the response header is 200(success)
                dispatch({
                    type: "LOGIN",
                    payload: currentUser
                })
            }
            }   
            console.log(res);
            dispatch({
                type:"GET_USER",
                payload: newUser
            });
            resolve("done");
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    });
}


// logout() action
export const logOut = () => dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('cart');
    dispatch({
        type: "LOGOUT"
    })
    dispatch({
        type:"REMOVE_CART"
    })
}


// get user by id action
export const getUserById = (id) => dispatch => {
    console.log(id);
    return new Promise((resolve,reject)=>{
        axios.get(`${ip}/users/${id}`).then((res) => {
            console.log(res.data);
            dispatch({
                type:"GET_USER",
                payload: res.data
            });
            resolve("done");
        }).catch((err) => {
            console.log(err);
            reject("error");
        })
    })

}