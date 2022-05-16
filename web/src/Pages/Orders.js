import React, { Component } from "react";
import Order from "./Order";
import { connect } from "react-redux";
import { getOrder } from "../actions/orderActions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link } from "react-router-dom";

class Orders extends Component {
  componentDidMount = () => {
    this.props
      .getOrder(this.props.users.profile.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let { profile } = this.props.users; //geting the login  user details
    let { orders } = this.props; //getting the orders from redux
    console.log(orders);

    const orderList =
      orders && profile.id ? (
        orders.map((order) => {
          // first checking the orders are available and user available and then passing order geting the oreders list
          const arrayDate = order.date.split("-");
          const date =
            arrayDate[0] + "-" + arrayDate[1] + "-" + arrayDate[2].slice(0, 2); //arranging the date in proper way
          return (
            <div key={order._id}>
              <Paper>
                <Link to={"/order/" + order._id} textDecoration="none">
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase>
                        <img alt="complex" src={order.item[0].imgUrl} />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1">
                            Order Date:<p>{date}</p>
                            <br />
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            shipping Address:{profile.address}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            status:{order.status}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          Total Amount:{order.TotalAmount}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Paper>
            </div>
          );
        })
      ) : (
        <div>no Orders to display</div>
      );
    return (
      <div>
        {orderList}
        {/* {profile.id ? {orderList}:(window.location.href = "/")}  */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    users: state.users,
  };
};
export default connect(mapStateToProps, { getOrder })(Orders);
