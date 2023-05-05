const User = require("../models/user");
const Seller  = require("../models/seller");

const getUserDetails = (id) => {
   
}

const getSellerDetails = (id) => {
    
}


exports.generateInvoice = (req,res)=> {
    const pdfKit = require('pdfkit');
    const fs = require('fs');
    let products = [];

    /*const sellerName = req.body.data.sellerName;
    const sellerId = req.body.data.sellerId;
    const userName = req.body.data.userName;
    const userId = req.body.data.userId;
    products = req.body.data.products
    const amount = req.body.data.amount*/

    const data = req.body;
    console.log(data)

    const {sellerName,userName,amount,orderId} = data;


let companyLogo = "E-Comm - A Project by Shubham Solanki";
let fileName = `./invoices/${orderId}.pdf`;
let fontNormal = 'Helvetica';
let fontBold = 'Helvetica-Bold';
    
let sellerInfo = {
        "companyName": sellerName,
        "contactNo": "9022222222222",
        "address": "R783, Rose Apartments, Santacruz (E)",
            "city": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400054",
            "country": "India",
            "contactNo": "040830843",
        }
    
        let customerInfo = {
            "customerName": userName,
            "address": "R783, Rose Apartments, Santacruz (E)",
            "city": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400054",
            "country": "India",
            "contactNo": "040830843",
            }
            
            let orderInfo = {
            "orderNo": orderId,
            "invoiceNo": "MH-MU-1077",
            "invoiceDate": "",
            "invoiceTime": "",
           
            }
            
    
            try {
            
            let pdfDoc = new pdfKit();
            
            let stream = fs.createWriteStream(fileName);
            pdfDoc.pipe(stream);

            pdfDoc.moveDown();
            
            pdfDoc.fontSize(12).font(fontBold).text("E-Comm - A Project by Shubham Solanki", 5, 10, { align: "center", width: 600 });
            
            const date = new Date();
            pdfDoc.font(fontNormal).fontSize(14).text('Order Invoice', 400, 30, { width: 200 });
            pdfDoc.fontSize(10).text(date, 400, 46, { width: 200 });
            
            pdfDoc.font(fontBold).text("Sold by:", 7, 100);
            pdfDoc.font(fontNormal).text(sellerInfo.companyName, 7, 115, { width: 250 });
            pdfDoc.font(fontNormal).text(sellerInfo.address, 7, 125, { width: 250 });
            pdfDoc.font(fontNormal).text(sellerInfo.city, 7, 135, { width: 250 });
            pdfDoc.font(fontNormal).text(sellerInfo.state, 7, 145, { width: 250 });
            pdfDoc.font(fontNormal).text(sellerInfo.country, 7, 155, { width: 250 });
            
            pdfDoc.text("Mobile : " + sellerInfo.contactNo , 7, 165, { width: 250 });
            
            pdfDoc.font(fontBold).text("Customer details:", 400, 100);
            pdfDoc.font(fontNormal).text(customerInfo.customerName, 400, 115, { width: 250 });
            pdfDoc.text(customerInfo.address, 400, 125, { width: 250 });
            pdfDoc.text(customerInfo.city, 400, 135, { width: 250 });
            pdfDoc.text(customerInfo.state, 400, 145, { width: 250 });
            pdfDoc.text(customerInfo.pincode, 400, 155, { width: 250 });
    
    
            
            pdfDoc.text("Order No:" + orderInfo.orderNo, 7, 195, { width: 250 });
            
            
            pdfDoc.rect(0, 250, 580, 20).fill("#5048E5").stroke("#5048E5");
            pdfDoc.font(fontBold).fontSize(12).fillColor("#fff").text("No.", 10, 256, { width: 50 });
            pdfDoc.font(fontBold).fontSize(12).fillColor("#fff").text("Product ID", 40, 256, { width: 250 });
            pdfDoc.font(fontBold).fontSize(12).text("Product", 200, 256, { width: 190 });
            pdfDoc.font(fontBold).fontSize(12).text("Qty", 350, 256, { width: 100 });
            pdfDoc.font(fontBold).fontSize(12).text("Price", 400, 256, { width: 100 });
            pdfDoc.font(fontBold).fontSize(12).text("Total Price", 500, 256, { width: 100 });
            
            let productNo = 1;
            let finalAmount = data.amount
            data.products.forEach(element => {
            console.log("adding", element.name);
            
            let y = 256 + (productNo * 20);
            pdfDoc.font(fontNormal).fontSize(10).text(productNo, 10, y, { width: 50 });
            pdfDoc.font(fontNormal).fontSize(10).fillColor("#000").text(element._id, 40, y, { width: 250 });
            pdfDoc.font(fontNormal).fontSize(10).text(element.name, 200, y, { width: 190 });
            pdfDoc.font(fontNormal).fontSize(10).text(element.count, 350, y, { width: 100 });
            pdfDoc.font(fontNormal).fontSize(10).text(element.price, 400, y, { width: 100 });
            pdfDoc.font(fontNormal).fontSize(10).text(element.price, 500, y, { width: 100 });
            productNo++;
            });
            
            pdfDoc.rect(0, 256 + (productNo * 20), 580, 0.2).fillColor("#000").stroke("#000");
            productNo++;

            pdfDoc.moveDown();
            
            pdfDoc.font(fontBold).fontSize(12).text("Total:", 400, 260 + (productNo * 17));
            pdfDoc.font(fontBold).fontSize(12).text(finalAmount, 500, 260 + (productNo * 17));
            
            pdfDoc.end();
            console.log("pdf generate successfully");
            } catch (error) {
            console.log("Error occurred", error);
            }
        
        }
            
    


   


