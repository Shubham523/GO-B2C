import React,{useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { cartEmpty, loadCart } from './helper/cartHelper'
import { processPayment, getMeToken } from './helper/paymentHelper'
import { createOrder } from './helper/orderHelper'
import  DropIn  from 'braintree-web-drop-in-react'
import { isAuthenticated } from '../auth/helper'
import { Modal,Button } from 'react-bootstrap'


const PaymentUI = ({products, setReload = f => f, reload = undefined }) => {
    
    const [info, setInfo] = useState({
        loading : false,
        success : false,
        clientToken : {},
        error : "",
        instance: {}
    })

    const [show, setshow] = useState(false);


    const user = isAuthenticated();
  
    const {_id, token} = user;
    const userId = _id;
    

    const getToken = ( userId, token ) => {
        
        getMeToken(userId, token)
        .then( infor => {
            console.log("Info : ",infor)
            if(infor.err) {
                setInfo({...infor,error : infor.err})
                
            }
            else {
                const clientToken = infor.clientToken;
               
                setInfo({clientToken});
                
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getToken(userId,token);
    }, [])

    const getARedirect = (redirect) => {
        if(redirect) {
            return <Redirect to="/" />
        }
    }


    const onPurchase = () => {
        setInfo({loading:true});
        let nonce;
        let getNonce = info.instance
        .requestPaymentMethod()
        .then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce : nonce,
                amount : getTotalAmount()
            };
            processPayment(userId,token,paymentData)
            .then( response => {
                
                    setInfo({...info,success: response.success})
                    localStorage.removeItem("cart");
                    setshow(true)
                    getARedirect(true);
                    


            } )
            .catch(error => {console.log(error)});
        })
        .catch(err=> console.log("Method err : ",err));
    }

    const getTotalAmount = () => {
        let amount = 0;
        products.map((product,index) => amount = amount + product.price );
        return amount;
    }

    const handleClose = () => {
        setshow(false);
    }

    const SuccessModal = () => {
        if(show) {
            return(
                <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, Your Order has been Placed Successfully !</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
            )
        }
        else {
            return( <div></div>)
        }
    }


    const showCardUI = () => {
            
        return(
            <div>
            {info.clientToken !== undefined && products.length > 0 ? (
            <div>
            <DropIn options={{ authorization: info.clientToken }} onInstance={(instance) => (info.instance = instance)}/>
        
            <button onClick={onPurchase}>Buy</button>
            
       </div>
       )
       : 
       (
          <div><h2>Please add products to cart</h2></div>
       )}
            </div>
        )
        
    }
   

    return (
        <div>
            <h3>Payment gateway price {getTotalAmount()}</h3>
             
             <SuccessModal/>
             {showCardUI()}
             
        </div>
    )
}

export default PaymentUI;
