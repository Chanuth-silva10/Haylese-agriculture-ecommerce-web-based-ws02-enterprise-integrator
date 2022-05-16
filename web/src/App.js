import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { useState } from "react";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import userRegistration from "./Pages/userRegistration";
import ProductPage from "./Pages/ProductPage";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import Orders from "./Pages/Orders";
import Navbar from "./components/Navbar";
import Order from "./Pages/Order";
import Delivery from "./Pages/DeliveryPage";
import EditDelivery from "./Pages/EditDelivery";
import DeliveryList from "./Pages/DeliveryList";
import Backdrop from "./components/Backdrop";
import SideDrawer from "./components/SideDrawer";
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "./actions/userActions";
import jwt from "jsonwebtoken";
import LoginPage from "./Pages/LoginPage";
import farmerProducts from "./Pages/farmerProducts";
import Payment from "./Pages/PaymentPage";
import UserProfile from "./Pages/userProfile";
import AddProductForm from "./Pages/AddProductForm";
import farmerOrders from "./Pages/farmerOrders";

// If the page is refresh the qty will keep as it is
const cartFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const initstate = {
  cart: {
    cartItems: cartFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initstate,
  compose(applyMiddleware(...middleware))
);

if (localStorage.jwtToken) {
  store.dispatch(login(jwt.decode(localStorage.jwtToken)));
}

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar click={() => setSideToggle(true)} />
        <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
        <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
        {/* Routes were defined from here */}
        <Route exact path="/user/registration" component={userRegistration} />
        <Route exact path="/user/login" component={LoginPage} />
        <Route exact path="/user/profile" component={UserProfile} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/order/:order_ID" component={Order} />
        <Route exact path="/delivery" component={Delivery} />
        <Route exact path="/delivery/edit" component={EditDelivery} />
        <Route exact path="/delivery/list" component={DeliveryList} />
        <Route exact path="/farmer" component={farmerProducts} />
        <Route exact path="/form" component={AddProductForm} />
        <Route exact path="/delivery/payment" component={Payment} />
        <Route exact path="/farmerOrders" component={farmerOrders} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
