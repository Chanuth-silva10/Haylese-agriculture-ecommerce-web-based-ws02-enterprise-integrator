import React, { Component } from "react"; // importing React and Component modules
import { connect } from "react-redux"; // importing connect funtion from react-redux module
import hashPassword from "password-hash"; // importing the hashPassword module
import { updateUser, getUserById, deleteUser } from "../actions/userActions"; //importing actions needed from userActions file

class UserProfile extends Component {
  state = {
    //state object which will maintain the data filled in the form
    userUpdate: {
      firstName: this.props.users.currentUser.firstName,
      lastName: this.props.users.currentUser.lastName,
      phoneNumber: this.props.users.currentUser.phoneNumber,
      address: this.props.users.currentUser.address,
      type: this.props.users.currentUser.type,
      email: this.props.users.currentUser.email,
      Newpassword: "",
    },
    oldPassword: "",
    field1: true,
    field2: true,
    field3: true,
    field4: true,
    field5: true,
    field6: true,
    field7: true,
  };

  // handling changes done to input field and setting new values to the state object
  handleChange = (e) => {
    if (e.target.name == "oldPassword")
      this.setState({ ...this.state, oldPassword: e.target.value });
    else {
      this.setState({
        ...this.state,
        userUpdate: {
          ...this.state.userUpdate,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  // handling the submit action of the form, validating the fields and calling the action to update the User
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.userUpdate.firstName === "" ||
      this.state.userUpdate.lastName === "" ||
      this.state.userUpdate.email === "" ||
      (this.state.userUpdate.type != "Buyer" &&
        this.state.userUpdate.type != "Farmer") ||
      this.state.userUpdate.phoneNumber === ""
    )
      //checking if any field is empty
      alert("Please fill all the fields"); //displaying alert message
    else {
      if (
        this.state.userUpdate.type === "Buyer" &&
        this.state.userUpdate.address === ""
      )
        alert("Please enter your shipping address");
      else if (
        !hashPassword.verify(
          this.state.oldPassword,
          this.props.users.currentUser.password
        )
      )
        // checking if the password is correct using the hashPassword module's verify method
        alert(
          "Invalid Old Password, Please check and enter the correct password"
        );
      else {
        if (this.state.userUpdate.Newpassword === "")
          // checking if the newPassword is empty and assigning the current Password to it
          this.state.userUpdate.Newpassword = this.state.oldPassword;
        console.log(this.state.userUpdate);
        this.props
          .updateUser(this.props.users.profile.id, this.state.userUpdate)
          .then((res) => {
            // invoking the updateUser action while passing the userUpdate object from the state and the id from the profile as arguments
            alert("Update successful!");
          })
          .catch((err) => {
            alert("Update failed");
          });
      }
    }
  };

  // handling the delete action validating the old password and calling the action to add the delete the user
  handleDelete = () => {
    if (
      !hashPassword.verify(
        this.state.oldPassword,
        this.props.users.currentUser.password
      )
    )
      alert(
        "Invalid Old Password, Please check and enter the correct password"
      );
    else {
      this.props.deleteUser(this.props.users.profile.id).then((res) => {
        alert("Deleted Successfully!");
        window.location.href = "/user/login"; // redirecting user to login page when the profile is deleted
      });
    }
  };

  componentDidMount = () => {
    // lifecycle method overriden to get the current user details using the getUserById method
    this.props
      .getUserById(this.props.users.profile.id)
      .then((res) => {
        // invoking the getUserById method while passing the profile id as an argument
        this.setState({
          //using the setState method to update the values in state object
          ...this.state,
          userUpdate: {
            ...this.state.userUpdate,
            firstName: this.props.users.currentUser.firstName, //setting the details from the currentUser object which is mapped in props
            lastName: this.props.users.currentUser.lastName,
            phoneNumber: this.props.users.currentUser.phoneNumber,
            address: this.props.users.currentUser.address,
            type: this.props.users.currentUser.type,
            email: this.props.users.currentUser.email,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return this.props.users.profile.id ? (
      <form onSubmit={this.handleSubmit} className="form">
        <h3 className="form">
          Edit Profile or{" "}
          <button
            type="button"
            class="btn btn-danger mb-3"
            onClick={this.handleDelete}
          >
            Delete Profile
          </button>
        </h3>
        <div class="form row g-2">
          <div>
            <i>Modify the fields that you need to update</i>
          </div>
          <div class="col-3">
            <input
              type="text"
              onChange={this.handleChange}
              class="form-control"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              defaultValue={this.props.users.currentUser.firstName}
            />
          </div>
          <div class="col-3">
            <input
              type="text"
              onChange={this.handleChange}
              class="form-control"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              defaultValue={this.props.users.currentUser.lastName}
            />
          </div>
        </div>
        <div class="form col-6">
          <input
            type="text"
            onChange={this.handleChange}
            class="form-control"
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={this.props.users.currentUser.email}
          />
        </div>
        <div class="form row g-2">
          <div class="form col-3">
            <input
              type="text"
              onChange={this.handleChange}
              class="form-control"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Contact Number"
              defaultValue={this.props.users.currentUser.phoneNumber}
            />
          </div>
          <div class="form col-3">
            <select
              id="type"
              name="type"
              onChange={this.handleChange}
              className="form-select"
              defaultValue={this.props.users.currentUser.type}
            >
              <option
                key="1"
                value="Buyer"
                selected={this.props.users.currentUser.type === "Buyer"}
              >
                Buyer
              </option>
              <option
                key="2"
                value="Farmer"
                selected={this.props.users.currentUser.type === "Farmer"}
              >
                Farmer
              </option>
            </select>
          </div>
        </div>
        {this.state.userUpdate.type === "Buyer" ? ( //checking if the user type is buyer and display the address input field
          <div class="form form-floating col-6">
            <textarea
              class="form-control"
              placeholder="Add your shipping address here"
              name="address"
              id="address"
              onChange={this.handleChange}
              defaultValue={this.props.users.currentUser.address}
            ></textarea>
            <label htmlFor="address">Shipping address</label>
          </div>
        ) : null}
        <div class="form row g-2">
          <div class="form col-3">
            <input
              type="password"
              onChange={this.handleChange}
              class="form-control"
              id="oldPassword"
              name="oldPassword"
              placeholder="Old Password"
            />
          </div>
          <div class="form col-3">
            <input
              type="password"
              class="form-control"
              id="Newpassword"
              name="Newpassword"
              placeholder="New Password"
              onChange={this.handleChange}
            />
          </div>
          <div className="form">
            <button type="submit" class="btn btn-primary mb-3">
              Update
            </button>
          </div>
        </div>
      </form>
    ) : (
      (window.location.href = "/user/login")
    ); //redirecting user to login page if the profile is not present(logged out)
  }
}

const mapStateToProps = (state) => ({
  // mapping state returned from redux store to props
  users: state.users,
});

export default connect(mapStateToProps, {
  updateUser,
  getUserById,
  deleteUser,
})(UserProfile); // exporting the component while mapping dispatch actions to props as well using connect function
