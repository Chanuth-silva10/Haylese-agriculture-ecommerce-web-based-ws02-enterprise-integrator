const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliverySchema = new Schema ({

    user_id : { type : String, required : true },
    quantity : {type:Number, required: true},
    amount : {type:Number, required:true},
    deliveryItems : {type:Array, "default" : [] },
    isCancel : {type : Boolean, required:true},
    address: {type : String, required: false},
    order_id : { type : String, required : false},
    deliveryMethod : {type : String,  required : false},
    deliveryCharges : {type : Number, required : false}

},{
    timestamps:true,
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;