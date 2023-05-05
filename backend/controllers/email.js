exports.sendEmailToUser = (req, res) => {
    const path = require('path');
    const {userName, email, orderId} = req.body;
    /*username user email orderid*/
    var dotenv = require("dotenv")
    dotenv.config();
    var nodemailer = require('nodemailer');
    var eusername = process.env.EMAIL_ID;
    var password = process.env.PASS;
    

    
var transporter = nodemailer.createTransport({
  
  
    service: 'gmail',
     auth: {
       user: eusername,
       pass: password,
   
     }
   });
   
   var mailOptions = {
     from: "shubdev2003@gmail.com",
     to: "shubdev2003@gmail.com",
     subject: 'Sending Email using Node.js',
     html: `<h1> Dear ${userName}, your Order has been placed Successfully. Kindly check the invoice attached with this mail</h1>`,
     attachments: [{
        filename: `${orderId}.pdf`,
        path: path.join(__dirname,`../invoices/${orderId}.pdf`),
        contentType: 'application/pdf'
      }],
    

   };
   
   transporter.sendMail(mailOptions, function(error, info){
     if (error) {
       console.log(error);
     } else {
       console.log('Email sent: ' + info.response);
     }
   });

   return;

}


exports.sendEmailToSeller = (req, res) => {
    
}