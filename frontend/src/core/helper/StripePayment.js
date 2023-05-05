import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/helper';
import { cartEmpty, loadCart } from './cartHelper';
import StripeCheckoutButton from 'react-stripe-checkout'
import { API } from '../../backend';
import { createOrder } from './orderHelper';
import { invoiceHelper } from './invoiceHelper';
import { sendEmailToSellerHelper, sendEmailToUserHelper } from './emailHelper';


const StripePayment = ({products, setReload = f => f,reload=undefined  }) => {
    const [data, setData] = useState({
        loading :false,
        success : false,
        error : "",
        address : "",

    });
    
    const [orderId, setId] = useState("");

    const user_token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated()._id
    const {firstName, lastName, email} = isAuthenticated();
    const finalName = firstName + " " + lastName;



    const getFinalAmount = () => {
        let amount = 0;
        products.map((product,index) => amount = amount + product.price);
        return amount;
    }

    const makePayment = (token) => {
        const body = {token, products}
        const headers = {
            "Content-Type" : "application/json",
           
        }

        return fetch(`${API}payment/processPayment`, {
            method : "POST",
            headers : headers,
            body : JSON.stringify(body)
        })
        .then(response => { 
            console.log(response)
            const orderProducts = products;
            console.log(orderProducts)
            const orderData = {
                products : orderProducts,
                transaction_id : response.id,
                user : userId,
                seller : products.map((p) => p.seller),
                amount : getFinalAmount() ,

            }
            

            createOrder(userId, user_token,orderData)
            .then(response => {localStorage.setItem("orderId", response._id)} )
            .catch(err => console.log(err))
            
            cartEmpty(() => console.log("empty"));

            const invoiceData = {
                
                sellerName : "demo",
                sellerId :  products.map((p) => p.seller),
                userName : finalName,
                userId : userId,
                products : orderProducts,
                amount : getFinalAmount(),
                orderId : localStorage.getItem("orderId")
            }

            const userEmailData = {
                userName:finalName,
                orderId : localStorage.getItem("orderId"),
                email : "shubdev2003@gmail.com",
            }


            const sellerEmailData = {
                userName:finalName,
                orderId : localStorage.getItem("orderId"),
                email : email,
            }
           
            invoiceHelper(invoiceData)
            .then(response => console.log(response))
            .catch(err => console.log(err))

            sendEmailToUserHelper (userEmailData)
            .then(response => console.log(response))
            .catch(err => console.log(err))

            /*sendEmailToSellerHelper()
            .then(response => console.log(response))
            .catch(err => console.log(err))*/
            
             setReload(!reload)
        })
        .catch(err => console.log(err))

    }

    const showStripeUI = () => {
        return(
            isAuthenticated() && products.length > 0 ?  (
                <StripeCheckoutButton
                  stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                  token={makePayment}
                  amount={getFinalAmount() * 100}
                  name="Buy Products"
                  shippingAddress
                  billingAddress

                >
                <button className="">PAY</button>
                </StripeCheckoutButton>
            ) : (
            <Link to="/user/SignUp" >
                <h3>Please Login </h3>
            </Link>)  
        )
    }

    
    
    return (
        <div>
            <h3>Checkout {getFinalAmount()}</h3>
            {showStripeUI()}
        </div>
    )
}

export default StripePayment;
