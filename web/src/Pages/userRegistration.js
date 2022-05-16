import React, { Component } from 'react' // importing React and Component modules
import { connect } from 'react-redux' // importing connect funtion from react-redux module
import { addUser } from '../actions/userActions' // importing addUser action from userActions file
import './LoginPage.css' // importing the css file

class userRegistration extends Component {

    state = { //state object which will maintain the data filled in the form
        user: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address:'',
            email: '',
            password: '',
            type: ''
        },
        cPassword: ''
    }

    Profile = null;

    // handling the submit action of the form, validating the fields and calling the action to add the User
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.user.firstName === "" || this.state.user.lastName === "" || this.state.user.email === "" || (this.state.user.type != "Buyer" &&  this.state.user.type != "Farmer") || this.state.user.phoneNumber === "") //checking if any field is empty
        alert("Please fill all the fields") //displaying alert message
    else{
    if(this.state.user.type === "Buyer"  && this.state.user.address === "")
        alert("Please enter your shipping address");
    else if(this.state.user.password != this.state.cPassword) // checking if the password and repeat password matches
        alert("Your passwords doesn't match,please check!");
    else{
        this.props.addUser(this.state.user).then((res)=>{ // invoking the addUser action while passing the user object from the state as an argument
            let {profile,authError} = this.props.users // after the action completes, retrieving/destructuring the profile,authError atrribute values
        }).catch((err)=>{
            this.Profile = null; //setting the value of profile attribute to null if there's an error
        })
    }
    }
    }

    // handling changes done to input field and setting new values to the state object
    handleChange = (e) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [e.target.name] : e.target.value }
        })
        console.log(this.state);
    }

    // handling changes done to confirm password input field and setting new values to the state object
    handleCPwd = (e) => {
        this.setState({
            ...this.state,
            cPassword : e.target.value 
        })
        console.log(this.state);
    }

    render() {
        let { profile,authError } = this.props.users; // destructuring profile and authError attribute from users which was added from redux state to props
        return (
            // checking whether the profile.id is available (User is already Logged in), if available direct the user to the relevant pages(Farmer dashboard or products list page)
            profile.id ? (profile.type === "Buyer" ? window.location.href = "/": window.location.href = "/farmer"  ):(
                <div style={{marginLeft : "35%"}}>
                <form onSubmit={this.handleSubmit} className="form">
                <h3 className="form">Sign Up</h3>
                <div class="form row g-2">
                {authError ? (<span>**This Email Already Exists, Please Log in : <a href="/user/login">Log in</a></span>):(null)}
                <div class="col-3">
                        <input type="text" onChange={this.handleChange} class="form-control" id="firstName" name="firstName" placeholder="First Name" />
                    </div>                    
                    <div class="col-3">
                        <input type="text" onChange={this.handleChange} class="form-control" id="lastName" name="lastName" placeholder="Last Name" />
                    </div>       
                    </div>
                    <div class="form col-6">
                        <input type="text" onChange={this.handleChange} class="form-control" id="email" name="email" placeholder="Email"  />
                    </div>   
                    <div class="form row g-2">          
                    <div class="form col-3">
                        <input type="text" onChange={this.handleChange} class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Contact Number" />
                    </div>                     
                    <div class="form col-3">
                        <select id="type" name="type" onChange={this.handleChange} className="form-select" >
                        <option selected>Select Account Type</option>
                        <option key="1" value="Buyer">Buyer</option>
                        <option key="2" value="Farmer">Farmer</option>
                        </select>
                    </div>     
                    </div>    
                    {this.state.user.type === "Buyer" ? //checking if the user type is buyer and display the address input field
                    (<div class="form form-floating col-6">
  <textarea class="form-control" placeholder="Add your shipping address here" name="address" id="address" onChange={this.handleChange}></textarea>
  <label htmlFor="address">Shipping address</label>
</div>):(null)}            
<div class="form row g-2">

                    <div class="form col-3">
                        <input type="password" onChange={this.handleChange} class="form-control" id="password" name="password" placeholder="Password" />
                    </div>                    
                    <div class="form col-3">
                        <input type="password" onChange={this.handleCPwd} class="form-control" id="Cpassword" name="Cpassword" placeholder="Repeat Password" />
                    </div>
                    <div className="form">
                        <button type="submit" class="btn btn-success" >Submit</button>
                    </div>
                    </div>
                </form>
            </div>
            )          

        )
    }
}


const mapStateToProps = (state) => ({ // mapping state returned from redux store to props
    users: state.users
})

export default connect(mapStateToProps,{ addUser })(userRegistration) // exporting the component while mapping dispatch action to props as well using connect function
