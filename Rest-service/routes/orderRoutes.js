const router = require('express').Router();
const Order = require('../models/orderModel');

router.post('/add', (req, res) => {//adding orders to the database
    const order = new Order(req.body)
    console.log(order);
    order.save().then((order) => { res.json(order) }).catch((err) => res.json(err));
})

router.get('/',(req,res)=>{//geting all the orders in datatbase
    console.log("in in get")
    Order.find().then((orders)=>res.json(orders)).catch((err)=>res.status(400).json("Erro" +err))
})

router.get('/:id', (req, res) => {//geting the orders belong to a specific user
    Order.find({ userId: req.params.id }).then((orders) =>{
    console.log(orders)
    res.json(orders)}).catch((err) => res.status(400).json("Error" + err))
  })

router.post("/orderStatus/:id", (req, res) => {
    Order.findByIdAndUpdate(req.params.id).then((order) => {
      order.status = "payment done";
  
      order.save().then(() => res.json("order status updated"));
    });
  });

module.exports = router;