import React, { Component } from 'react'  // importing React and Component modules
import { connect } from 'react-redux' // importing connect funtion from react-redux module
import { login } from '../actions/userActions' // importing login action from userActions file
import './LoginPage.css' // importing the css file

class userLogin extends Component {

    state = { //state object which will maintain the data filled in the form
        email: '',
        password: '',
    }

    // handling the submit action of the form, validating the fields and calling the action to update the User
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.login(this.state).then((res)=>{

            let {profile} = this.props.users

            if(profile.type){ // checking the profile type 
                switch (profile.type) { // setting the path according the user type
                    case "Buyer":
                        window.location.href = "/"
                        break;
                    default:
                        window.location.href = "/farmer"
                        break;
                }
            }
        }).catch((err)=>{
            console.log(err);
        })    
    }

    // handling changes done to input field and setting new values to the state object
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    render() { 
        let { profile,authError } = this.props.users; // destructuring profile and authError attribute from users which was added from redux state to props
        return (
                        // checking whether the profile.id is available (User is already Logged in), if available direct the user to the relevant pages(farmer dashboard or products list page)
            profile.id ? (profile.type === "Buyer" ? window.location.href = "/": window.location.href = "/farmer"  ):(<div>
                <form onSubmit={this.handleSubmit} className="form" style={{marginLeft : "35%"}} >
                <h3 className="form">login</h3>
                {// setting a span with authError if there's a login error
                authError ? (<span>**Invalid credentials</span>):(null)} 
                    <div className="form col-3">
                        <input type="text" onChange={this.handleChange} class="form-control" id="email" name="email" placeholder="Email" />
                    </div>
                    <div className="form col-3">
                        <input type="password" onChange={this.handleChange} class="form-control" id="password" name="password" placeholder="Password" />
                    </div>                  
                    <a href="/user/registration" className="form">Create account</a>
                    <div className="form">
                        <button type="submit" class="btn btn-success">Login</button>
                    </div>
                </form>
                </div>)        
        )
    }
}


const mapStateToProps = (state) => ({ // mapping state returned from redux store to props
    users: state.users
})

export default connect(mapStateToProps,{ login })(userLogin) // exporting the component while mapping dispatch action login to props as well using connect function
