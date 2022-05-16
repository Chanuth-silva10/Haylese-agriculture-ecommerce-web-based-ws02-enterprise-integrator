const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const paymentSchema = new Schema({
    itemName : {type:String, requires:false},
    userID : {type:String, required:false}, 
    userMail : {type: String, required:false},
    noOfItems : {type: Number, required:false},//make this optional
    totalAmount: {type:Number, required:false},
    deliveryCharges : {type:Number, required:false},
    NIC : {type:Number, required : false},
    PhoneNumber : {type:Number, required:false},
    CardNumber : {type:Number, required:false},
    ExpirationMonth : {type:String, required:false},
    ExpirationYear : {type:Number, required:false },
    CVC : {type:Number, required:false},
    delivery : {type : String, required:false},
    deliveryCharges : {type : Number, required :false},
    paymentMethod : {type : String, required:false},
    pinNumber : {type:Number, required:false}

},{
    timestamps:true
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;