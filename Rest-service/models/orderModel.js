const mongoose = require('mongoose');
const schema = mongoose.Schema;

//-----create schema to order----//
const orderSchema = new schema({
    item:{
        type:Array,
        require:true,
        itemId:{
            type:String,
            required:true
        },
        itemName:{
            type: String,
            required: true
        },
        itemcolor:{
            type: String,
            required: true
        },
        qty:{
            type: Number,
            required: true
        },
        amount:{
            type: Number,
            required: true
    
        },
        imgUrl:{
            type:String,
            required:true
        },
        farmerId:{
            type:String,
            required:true
        }
    },
    userId:{
        type:String,
        require:true
    },
    TotalAmount:{
        type:Number,
        require:true
    },
    date:{
        type: Date,
    },
    status:{
        type:String,
        require:true
    }
});


module.exports = order = mongoose.model('order', orderSchema);