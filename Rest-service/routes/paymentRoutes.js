const router = require('express').Router();
let Payment = require('../models/paymentModel');
var nodemailer = require('nodemailer');
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({  //initializing the SMS service (non-paid version)
  apiKey: "be899791",
  apiSecret: "9IjSZjdwGGsrW760"
})

//add payment

router.post("/add", (req,res) => {
    const newPayment = new Payment(req.body);

    newPayment.save().then(() => res.json("Payment Added!"));  //Saving the payment info to the DB

    const from = "Vonage APIs";
    const to = "94776486675";
    const text = ` This text message is to confirm that we recieved you payment of ${newPayment.totalAmount}.00 via ${newPayment.paymentMethod} sucessfully. Deliver charges are ${newPayment.deliveryCharges}.00. Thank you for shopping with us`;

    vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          console.log("Message sent successfully.");
        } else {
          console.log(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`
          );
        }
      }
    });

        const email = req.body.userMail;
        const subject = 'Payment Confirmation';
        const body =  ` This Email is to confirm that we recieved you payment of ${newPayment.totalAmount}.00 via ${newPayment.paymentMethod} sucessfully. Deliver charges are ${newPayment.deliveryCharges}.00. Thank you for shopping with us, Please do contact us for any inconvenience`;

        var transporter = nodemailer.createTransport({  //initializing the main account
            service: 'gmail',
            auth: {
              user: 'tweb4172@gmail.com',
              pass: '#sliit1234'
            }
          });
          
          var mailOptions = {  //adding email body and subject
            from: 'tweb4172@gmail.com',
            to: email ,
            subject: subject,
            text: body
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

});

module.exports = router;