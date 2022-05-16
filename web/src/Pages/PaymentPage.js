import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addPayment} from '../actions/paymentAction'; //importing reducers 
import {addDelivery} from '../actions/deliveryActions';
import {updateOrderStatus} from '../actions/orderActions';
import './PaymentPage.css'; //importing the CSS file 

class Payment extends Component {
    constructor(props){
        super(props);

        this.onChangeNic = this.onChangeNic.bind(this);  //binding functions for 'this' keyword to work
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.onChangeCvc = this.onChangeCvc.bind(this);
        this.onChangeExpMonth = this.onChangeExpMonth.bind(this);
        this.onChangeExpYear = this.onChangeExpYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeDelivery = this.handleChangeDelivery.bind(this);
        this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
        this.onChangePinNumber = this.onChangePinNumber.bind(this);
        this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);


        this.state = {
            itemName :'',
            userID : '', 
            userMail : '',
            noOfItems : '',
            totalAmount: '',
            deliveryCharges : 300,  //setting the default value for charges
            NIC : '',
            PhoneNumber : '',
            CardNumber : '',
            ExpirationMonth : '',
            ExpirationYear : '',
            CVC :'',
            delivery : "Prompt Express", // default value for the delivery,
            orderId : '',
            paymentMethod : 'card',
            pinNumber : ''
        }
    }

    componentDidMount(){
      const search = this.props.location.search; // returns the URL query String
      const params = new URLSearchParams(search); 
      const orderID = params.get('id'); 

      this.setState({
        orderId : orderID
      })

          }

    onChangeNic(e){
        this.setState({
            NIC : e.target.value
        })
    }

    onChangeCardNumber(e){

        this.setState({
            CardNumber : e.target.value
        })
    }

    onChangeExpMonth(e){

        e.target.value > 12  ? alert("Please enter a number between 1 and 12") : (  //validations for the input fields

            this.setState({
                ExpirationMonth : e.target.value
            })
        ) 

      
    }

    onChangeExpYear(e){

        this.setState({
            ExpirationYear : e.target.value
        })
        
    }

    onChangeCvc(e){
        this.setState({
            CVC : e.target.value
        })
    }

    onSubmit(e){


        const {addPayment,addDelivery,updateOrderStatus} = this.props;

        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];  // getting cart item information from the local storage

        const itemnames = cartItems.map((item) => {
            return item.name;
        })
        
        const s = cartItems.reduce(  //calculating the item prices
            (s,{price}) => s+price,0
            );

        e.preventDefault();
        const {users, orders} = this.props;

        const payment = {
          itemNames : itemnames,
          userID : users.profile.id, 
          userMail : users.profile.email,
          noOfItems : itemnames.length,
          totalAmount: s,
            deliveryCharges : this.state.deliveryCharges,
            NIC : this.state.NIC,
            PhoneNumber : this.state.PhoneNumber,
            CardNumber : this.state.CardNumber,
            ExpirationMonth : this.state.ExpirationMonth,
            ExpirationYear :  this.state.ExpirationYear,
            CVC :this.state.CVC,
            delivery : this.state.delivery,
            address : users.profile.address,
            paymentMethod : this.state.paymentMethod,
            pinNumber : this.state.pinNumber
            
          }
          
          const delivery = { 
            order_id : this.state.orderId,
            user_id : users.profile.id,
            quantity : itemnames.length,
            amount : s,
            deliveryItems : itemnames,
            isCancel : false,
            address: users.profile.address,
            deliveryMethod : this.state.delivery,
            deliveryCharges : this.state.deliveryCharges
          }
          
          console.log(payment);
          addPayment(payment);  //adding info to the payment Db
          addDelivery(delivery); //adding info to the delivery DB
          updateOrderStatus(this.state.orderId); //Updating order status to 'payment done'
          
          console.log('payment: ', payment);
          alert("Payment Successful");
           
          this.setState({
            
                itemName :'',
                userID : '', 
                userMail : '',
                noOfItems : '',//make this optional
                totalAmount: '',
                deliveryCharges : 300,
                NIC : '',
                PhoneNumber : '',
                CardNumber : '',
                ExpirationMonth : '',
                ExpirationYear : '',
                CVC :'',
                delivery : "Prompt Express"
            
        })

        window.location.href = "/"; //Upon payment completion redirecting user to the cart page  
    }

    handleChangeDelivery(e){
        let charges = null;
        if(e.target.value == 'Prompt Express'){  //assigning charges to according to the values
            charges = 300;
        }else if (e.target.value == 'DHL'){
            charges = 550;
        }else if (e.target.value == 'TUKTUK'){
            charges = 300;
        }
        this.setState({
            delivery: e.target.value,
            deliveryCharges : charges
            
        })

        
    }

    handlePaymentMethod(e){
      let method = null;
        if(e.target.value == 'card'){  //assigning method according to the values
            method = 'card';
        }else if (e.target.value == 'mobile'){
            method = 'mobile';
        }
        this.setState({
          paymentMethod: method
            
        })

    }

    onChangeMobileNumber(e){
      this.setState({
        PhoneNumber : e.target.value
      })
    }

    onChangePinNumber(e){
      this.setState({
        pinNumber : e.target.value
      })
    }


    render() {
        const {users,orders} = this.props; //Below are input fields to get the required information
        return (
          <div>
            <h3 className="payment-text">Payment Information</h3> 
            <form onSubmit={this.onSubmit} className="container">  
            <label>Choose a Payment Method</label>  

            <br></br>
              <select
                value={this.state.paymentMethod}
                onChange={this.handlePaymentMethod}
              >
                <option value="card">Card Payments</option>
                <option value="mobile">Mobile Payment</option>
              </select>
              <br></br>
              <br></br>
             
              
          {this.state.paymentMethod === 'card' ? 

            <div>
              <div className="form-group nic-card">
                <label>Enter your NIC</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.NIC}
                  onChange={this.onChangeNic}
                />
              </div>



              <br></br>
              <div className="form-group nic-card">
                <label>Card Number</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  required
                  className="form-control"
                  value={this.state.CardNumber}
                  onChange={this.onChangeCardNumber}
                />
              </div>

              <br></br>
              <div className="form-group month-year">
                <label>Expiration Month</label>
                <input
                  type="text"
                  pattern="[1-9]*"
                  required
                  className="form-control"
                  maxLength="2"
                  min="1"
                  max="12"
                  value={this.state.ExpirationMonth}
                  onChange={this.onChangeExpMonth}
                />
              </div>
              <br></br>
              <div className="form-group month-year">
                <label>Expiration Year</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  required
                  className="form-control"
                  maxLength="4"
                  min="2022"
                  max="2050"
                  value={this.state.ExpirationYear}
                  onChange={this.onChangeExpYear}
                />
              </div>
              <br></br>
              <div className="form-group">
                <label>CVC</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  required
                  className="form-control cvc"
                  maxLength="3"
                  min="1"
                  value={this.state.CVC}
                  onChange={this.onChangeCvc}
                />
              </div>
              <br></br>
              </div>
              : 
              <div>
              

              <br></br>
              <div className="form-group nic-card">
                <label>Mobile Number</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  required
                  className="form-control"
                  // value={ users.profile.phone}
                  onChange={this.onChangeMobileNumber}
                />
              </div>

             

              <br></br>
              <div className="form-group month-year">
                <label>Six Digit Pin Number</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  required
                  className="form-control"
                  maxLength="6"
                  value={this.state.pinNumber}
                  onChange={this.onChangePinNumber}
                />
              </div>
              <br></br>

              </div>
              }
              <label>Choose a delivery method</label>
              <br></br>
              <select
                value={this.state.delivery}
                onChange={this.handleChangeDelivery}
              >
                <option value="Prompt Express">Prompt Express</option>
                <option value="DHL">DHL</option>
                <option value="TUKTUK">Tuk Tuk</option>
              </select>
              <br></br>
              <br></br>
              <div className="form-group">
                <input
                  type="submit"
                  value="Pay Now"
                  className="btn btn-success"
                />
              </div>
            </form>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({  // assigning initial stated to props
    // delivery : state.delivery
    users : state.users,
    cartItems : state.cartItems,
    orders : state.orders
})

export default connect(mapStateToProps, {addPayment,addDelivery,updateOrderStatus}) (Payment)  // connecting reducers 

