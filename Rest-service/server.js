const express = require('express'); // importing express module
const cors = require('cors'); // importing cors module
const bodyParser = require('body-parser'); // importing body-parser module
const port = process.env.PORT || 5000; //setting the port from the deployed env or assingning 5000 as the port constant
const mongoose = require('mongoose'); // importing mongoose module
const Db = require('./database/dbConfig').dbKey; // importing database key
const userRoutes = require('./routes/userRoutes'); // importing service files
const deliveryRoutes = require('./routes/deliveryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


const app = express(); // creating express app

mongoose.connect(Db) //connecting mongoDb using mongoose
.then(
    console.log('Db connected!')
)
.catch((err)=>{
    console.log(err);
});

app.use(cors()); //using cors middleware as a connect

app.use(bodyParser.json()); // to accept json type requests

app.use('/api/users', userRoutes); //user service interface

app.use('/api/products', productRoutes); // product service interface

app.use('/api/order', orderRoutes); // order/cart  service interface

app.use('/api/delivery', deliveryRoutes); // delivery service interface

app.use('/api/payment', paymentRoutes); // payment service interface

app.listen(port, () => { // setting the app to listen on the configured port
    console.log(`Listening on port: ${port}`);
});
