import { useParams } from "react-router";
import "./HomePage.css";
import { connect } from "react-redux";
import React, { Component, useState, useEffect } from "react";
import { getProducts } from "../actions/productActions";
import FarmerProduct from "./farmerProduct";

import { addProduct, updateStateRed } from "../actions/farmerActions";
class farmerProducts extends Component {
  componentDidMount() {
    this.props.getProducts(); //gettin product from database
  }

  render() {
    const user = this.props.user;
    console.log(user);

    const handleUpdateStateRed = () => {
      updateStateRed(); //updating the update state in reducx store to false
    };
    const products = this.props.products; //geting the product in the product collection
    console.log(products);

    const farmerProductsList = products
      
    const farmerProductArr = farmerProductsList.map((product) => {
      //passing product to FarmerProduct one by one
      return <FarmerProduct product={product} />;
    });
    console.log(farmerProductArr);
    return (
      <div className="homepage">
        <a href="/form" className="info__button" onClick={handleUpdateStateRed}>
          Add a product
        </a>
        <div className="homepage__products">{farmerProductArr}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    user: state.users.profile,
  };
};

export default connect(mapStateToProps, {
  getProducts,
  addProduct,
  updateStateRed,
})(farmerProducts);
