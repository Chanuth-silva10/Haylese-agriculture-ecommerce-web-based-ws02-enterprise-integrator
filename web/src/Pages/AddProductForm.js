import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { addProduct } from '../actions/farmerActions';
import { updateProduct } from '../actions/farmerActions';
import { Input } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function AddProductForm(props) {
  const classes = useStyles();

  let {profile} = props.users;
  const update = props.update;
  console.log(update);
  const productWantTOUpdate = props.productWantTOUpdate;

  const [state, setState] = useState(
    {
      product:{
        itemName: null,
        description: null,
        countInStock: 0,
        price: 0,
        date: new Date(),
        imageUrl: null,
        farmerId: profile.id},
        file: null        
      }      );
//  const handlechange=(e)=>{
//     setState({
//         ...state,
//         [e.target.name]:e.target.value
//       })
//   }
  // const handlesubmit=(e)=>{
  //   e.preventDefault();
  //   console.log(state)
  //   props.addProduct(state).then((res)=>{
  //     window.location.href="/farmer"
  //   }).catch((err)=>{
     
  //   });


  const handlechange = (e) => {
    if(e.target.name === "photo"){
      setState({
        ...state,
        file: e.target.files[0]
      })
      console.log(e.target.files[0])
    }
    else{
    setState({
      ...state,
      product: {
        ...state.product,
        [e.target.name]: e.target.value
      }
    })
  }
  console.log(state);
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(state.file,state.product);
    props.addProduct(state.product,state.file).then((res) => {
      window.location.href = "/farmer"
    }).catch((err) => {
      console.log(err);
  }) 
  }
  const handleUpdateProduct=(e)=>{
    e.preventDefault();
    console.log(state.product, productWantTOUpdate._id)
    props.updateProduct(state.product, productWantTOUpdate._id).then((res) => {
      alert("Update Successful");
      window.location.href="/farmer"
      console.log(res);
    }).catch((err)=>{
      console.log(err);
  }) 
  }

  return (
    
    <Container component="main" maxWidth="xs">
      {update==true ? (<div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          update Product
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="itemName"
                variant="outlined"
                required
                fullWidth
                id="itemName"
                label="Item Name"
                autoFocus
                onChange={handlechange}
                defaultValue={productWantTOUpdate.itemName}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="description"
                name="description"
                autoComplete="description"
                onChange={handlechange}
                defaultValue={productWantTOUpdate.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="countInStock"
                label="Count In Stock"
                type="number"
                id="countInStock"
                autoComplete="current-password"
                onChange={handlechange}
                defaultValue={productWantTOUpdate.countInStock}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                id="price"
                autoComplete="current-password"
                onChange={handlechange}
                defaultValue={productWantTOUpdate.price}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <a href='/farmer'
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleUpdateProduct }>
            Update
          </a>
          
        </form>
      </div>):(<div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          add Product
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <input type="file" name="photo" id="photo" onChange={handlechange} />
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="itemName"
                variant="outlined"
                required
                fullWidth
                id="itemName"
                label="Item Name"
                autoFocus
                onChange={handlechange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="description"
                name="description"
                autoComplete="description"
                onChange={handlechange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="countInStock"
                label="Count In Stock"
                type="number"
                id="countInStock"
                autoComplete="current-password"
                onChange={handlechange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                id="price"
                autoComplete="current-password"
                onChange={handlechange}
              />
            </Grid>
          </Grid>
          <Link to='/farmer'>
          <a href='/farmer'
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handlesubmit}>
            ADD
          </a>
          </Link>
        </form>
      </div>) }
     
      
    </Container>
  );
}
const mapStateToProps = (state) => ({
    users: state.users,
    update:state.products.update,
    productWantTOUpdate:state.products.productWantTOUpdate
})
export default connect(mapStateToProps,{addProduct,updateProduct})(AddProductForm)