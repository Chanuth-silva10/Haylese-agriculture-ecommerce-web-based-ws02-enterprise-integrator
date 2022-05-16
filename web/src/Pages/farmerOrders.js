import React, { Component } from 'react'
import Order from './Order'
import { connect } from 'react-redux'
import {getAllOrders} from '../actions/orderActions'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';

class FarmerOrders extends Component {


    componentDidMount = () => {
        this.props.getAllOrders(this.props.users.profile.id).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err)
        })
    }

 render(){

    let allOrders = this.props.allOrders;
    console.log(allOrders)
    let { profile } = this.props.users;

    
    const itemlist = allOrders.map(order=>{
        console.log(order)
        return (
       order.item.map(item=>{
        console.log(profile.id,item.farmerId)
        // console.log(item)
           return (<div>
               {item.farmerId == profile.id ?(
               <div>
                <Paper>
                    {/* <Link to={'/order/' + order._id} textDecoration='none' > */}
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase >
                                    <img alt="complex" src={item.imgUrl} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                           item Name:<p>{item.itemName}</p><br />
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1">
                                           quantity:<p>{item.qty}</p><br />
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1">
                                            Order Date:<p>{order.date}</p><br />
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            shipping Address:{order.address}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            status:{order.status}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Total Amount:{order.TotalAmount}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    {/* </Link> */}
                </Paper>
               </div>):(<div></div>)}
           </div>)
       }))
    }
    )
    console.log(itemlist)

    return (
        <div>
            {itemlist}
        </div>
    )
 }

}
const mapStateToProps = (state) => {
    return {
        allOrders: state.orders.allOrders,
        users: state.users
    }
}
export default connect(mapStateToProps, {getAllOrders})(FarmerOrders)

