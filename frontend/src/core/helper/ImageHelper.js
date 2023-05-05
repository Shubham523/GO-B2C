import React from 'react';
import { API } from '../../backend';
import './ImageHelper.css';

const ImageHelper = ({product}) => {
    return (
       
            <img className="product__image" src={`${API}/product/image/${product._id}`} alt="product" height="auto" width="100%"/>
       
    )
}

export default ImageHelper;
