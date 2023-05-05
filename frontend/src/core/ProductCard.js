import React,{useState, useEffect} from 'react'
import { Button, Card, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { AddProductToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';
import './ProductCard.css';

const ProductCard = ({product, addToCart = true, removeFromCart = false,
                      setreload = function(f) { return f;}, reload = undefined  }) => {
    
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const getARedirect = (redirect) => {
        if(redirect) {
            return <Redirect to="/user/Cart" />
        }
    }

    const addToCartButtonListener = () => {
        AddProductToCart(product, () => setRedirect(true))
    }
    
    const showAddToCart= addToCart => {
        return(
            addToCart && (
                <button className="product__edit__product__button" onClick={addToCartButtonListener}> Add to Cart</button> 
            )
        )
    }

    

    const showRemoveFromCart= removeFromCart => {
        
        return(
            removeFromCart && (
                <button className="product__edit__product__button" onClick={() => 
                    { 
                        removeItemFromCart(product._id)
                        setreload(!reload);
                   
                    }
                }>Remove From Cart</button> 
            )
        )
    }
    return (
        <div className="col-3">
            <div className="" >

                <Card id="card__div" className="shadow-lg p-0 mb-0 bg-white rounded">
                   
                    <Card.Body>
                        <ImageHelper product={product} />
                        <Card.Title className="product__name">{product.name}</Card.Title>
                        <Card.Text className="product__description">
                            {product.description}
                        </Card.Text>
                        <Card.Text className="product__description">
                            {product.price}
                            
                        </Card.Text>
                    </Card.Body>
                    <center>
                        <Card.Body>

                            
                            {showAddToCart(addToCart)}
                            {getARedirect(redirect)}
                            {showRemoveFromCart(removeFromCart)}
                            


                        </Card.Body>
                    </center>
                </Card>
            </div>
        </div>
    )
}

export default ProductCard
