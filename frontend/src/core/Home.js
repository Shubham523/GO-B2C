import React,{useState, useEffect} from 'react';
import { getAllProductsForUser } from './helper/coreapicalls';
import Navbar from "./Navbar";
import ProductCard from './ProductCard';


const Home = () => {
    
    const [products, setProducts] = useState([]);
    const [err, setErr] = useState(false)

    useEffect(() => {
        getAllProductsForUser()
        .then(data => {
            console.log(data);
            if(data.error) {
                setErr(true)
            }
            else{
                setProducts(data)
            }
        })
    }, [])

    return (
        <div>
            <Navbar/>
             <div className="col-12">
                 <br/>
                 <div className="row">
                    
                     {products.map((product,key) => ( <ProductCard key={key} product={product}/> ))}
                     
                   
                 </div>
             
             </div>
            
        </div>
    )
}

export default Home;
