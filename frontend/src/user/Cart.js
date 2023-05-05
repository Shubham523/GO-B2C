import React,{useState, useEffect} from 'react';
import { loadCart } from '../core/helper/cartHelper';
import StripePayment from '../core/helper/StripePayment';
import Navbar from '../core/Navbar';

import ProductCard from '../core/ProductCard';

const Cart = () => {
    
    const [products, setProducts] = useState([]);
    const [reload, setreload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());

    }, [reload])

    const loadAllProducts = products => {
        return(
            <div className="row">
            
             {products.map((product,index) => 
             <ProductCard 
             key={index}
             product={product} 
             addToCart={false} 
             removeFromCart={true}
             setreload={setreload}
             reload={reload}
              /> )}
             </div>
        )
    }


    return (
        <div>
            <Navbar/>
            <br/>
            <h1>Cart </h1>
            
           
            {products.length > 0 ? loadAllProducts(products) : <h3>Cart is Empty</h3>}
            <StripePayment products = {products} setReload={setreload}/>
            
        </div>
    )
}

export default Cart
