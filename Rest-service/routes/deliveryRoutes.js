const router = require('express').Router();
let Delivery = require('../models/deliveryModel');

//add delivery
router.post("/add", (req, res) => {
  const newDelivery = new Delivery(req.body);

  newDelivery.save().then(() => res.json("Delivery Added"));
});

// //get delivery
router.get("/", (req, res) => {
  Delivery.find((err, docs) => {
    res.json(docs);
  });
});

// //update delivery
router.post("/update/:id", (req, res) => {
  Delivery.findByIdAndUpdate(req.params.id).then((delivery) => {
      (delivery.user_id = req.body.user_id),
      (delivery.quantity = Number(req.body.quantity)),
      (delivery.amount = Number(req.body.amount)),
      (delivery.deliveryItems = req.body.deliveryItems),
      (delivery.isCancel = req.body.isCancel),
      (delivery.order_id = req.body.order_id),
      (delivery.address = req.body.address),
     ( delivery.deliveryMethod =   req.body.deliveryMethod),
      (delivery.deliveryCharges = req.body.deliveryCharges)

    delivery.save().then(() => res.json("Delivery Updated!"));
  });
});

// //cancel delivery
router.post("/cancel/:id", (req, res) => {
  Delivery.findByIdAndUpdate(req.params.id).then((delivery) => {
    delivery.isCancel = req.body.isCancel;

    delivery.save().then(() => res.json("Delivery Canceled!"));
  });
});

// //get delivery using an id
router.get("/:id", (req, res) => {
  Delivery.findById(req.params.id)
    .then((delivery) => res.json(delivery))
    .catch((err) => res.status(400).json("Error:" + err));
});

// //delete by id
router.delete("/:id", (req, res) => {
  Delivery.findByIdAndDelete(req.params.id)
    .then((delivery) =>
      res.json(
        "Delivery with the id " + delivery.id + " Successfully Deleted !"
      )
    )
    .catch((err) => res.status(400).json("Error: " + err));
});



module.exports = router;