import Product from "../components/Product";
import "./HomePage.css";
import { useEffect, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

//Actions
import { getProducts } from "../actions/productActions";

class HomePage extends Component {
  state = {
    productList: [],
  };
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    let { products, loading, error } = this.props.products;

    let productList = this.state.productList;

    const searchHandler = (e) => {
      // Handle the search function start from here
      this.setState({
        ...this.state,
        productList: products
          ? products.filter(
              (product) =>
                product.itemName
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                product.description
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
            )
          : "not found",
      });
    };

    if (this.state.productList.length === 0) productList = products;

    return (
      <div className="homepage">
        <form class="searchbar">
          <input
            class="form-control"
            type="search"
            placeholder="Search anything here.."
            aria-label="Search"
            onChange={searchHandler}
          />
        </form>
        {/* From here display all the products available and if product is not 
            enterd it display as loading... */}
        <h2 className="homepage__title">Latest Product</h2>
        <div className="homepage__products">
          {loading ? (
            <h2> Loading...</h2>
          ) : error ? (
            <h2> {error} </h2>
          ) : (
            productList.map((product) => (
              // Reuse Produc class in this Home page
              //Reausability
              <Product
                key={product._id}
                productId={product._id}
                name={product.itemName}
                price={product.price}
                date={product.date}
                description={product.description}
                imageUrl={product.imageUrl}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapsStatetoprops = (state) => ({
  products: state.products,
});
export default connect(mapsStatetoprops, { getProducts })(HomePage);
