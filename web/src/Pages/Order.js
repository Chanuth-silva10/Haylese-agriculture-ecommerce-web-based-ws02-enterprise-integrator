import React, { Component } from "react";
import SelectedProduct from "./SelectedProduct";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 700,
    marginTop: 40,
    borderRadius: 10,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const Order = (props) => {
  const classes = useStyles();
  const { order_ID } = useParams(); //geting the order id
  console.log("order id", order_ID);
  const orders = props.orders; //geting the orders
  console.log(orders);
  const order = orders ? orders.filter((order) => order._id == order_ID) : null; //geting the perticular order by filtering

  console.log(order, "order eka");
  const items = order[0].item.map((item) => {
    //geting item
    return (
      <div className={classes.root} key={item.order_id}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={item.imgUrl} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    item Name:{item.itemName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Item price:{item.amount}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Qunatity:{item.qty}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    item color: {item.itemcolor}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{item.amount}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  });
  return <div>{items}</div>;
};
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
  };
};
export default connect(mapStateToProps, null)(Order);
