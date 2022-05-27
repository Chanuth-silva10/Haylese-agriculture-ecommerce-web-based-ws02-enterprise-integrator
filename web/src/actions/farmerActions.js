import axios from "axios";
import { ip } from "../utils/hostAddress";

export const addProduct = (product, file) => (dispatch) => {
  console.log(product);
  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "shoppingLankaWeb");
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://api.cloudinary.com/v1_1/shoppinglanka/image/upload",
        formData
      )
      .then((response) => {
        console.log(response.data.url);
        product.imageUrl = response.data.url;
        console.log(product);
        axios
          .post(`${ip}/products/add`, product)
          .then((res) => {
            dispatch({ type: "ADD_PRODUCT", payload: product });
            console.log(product);
            resolve("product added");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const ProductWantTOUpdate = (product) => (dispatch) => {
  console.log("updating product id", product._id);
  dispatch({ type: "PRODUCT_WANT_TO_UPDATE", payload: product }); //updating reducx  store
};
export const deleteProduct = (productId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${ip}/products/${productId}`)
      .then((res) => {
        dispatch({ type: "DELETE_PRODUCT", payload: res.data });
        console.log(res.data);
        resolve("product deleted");
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
export const updateStateRed = () => (dispatch) => {
  dispatch({ type: "UPDATE_STATE", payload: null }); //updating reducx  store
};
export const updateProduct = (product, id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    console.log(product, id);
    axios
      .post(`${ip}/products/update/${id}`, product)
      .then((res) => {
        //product include _id but not  include in product module
        dispatch({ type: "FARMER_UPDATE_PRODUCT", payload: res.data });
        console.log(res.data);
        resolve("update product");
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
export const updatCountInStock = (item) => (dispatch) => {
  return new Promise((resolve, reject) => {
    // items.forEach(item => {
    axios
      .post(
        `${ip}/products/updateCountInStock/${item.itemId}`,
        item.countInStock
      )
      .then((res) => {
        // console.log('get products')
        console.log("qua updated product added");
        // dispatch({type:'FARMER_UPDATE_PRODUCT',payload:product})
        resolve("product update product added");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    // });
  });
};
