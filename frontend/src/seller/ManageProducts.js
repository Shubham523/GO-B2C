import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper'
import { deleteProduct, getSellersProduct } from './helper/adminapicall'
import { SellerMenu } from './SellerDashBoard';
import { Button, Card, Modal } from 'react-bootstrap';
import './styles/ManageProducts.css';
import { Link } from 'react-router-dom';


const ManageProducts = () => {
  const seller = isAuthenticated();

  const [products, setProducts] = useState({
    productData: [],
    error: false,
    success: false,
  });

  const { productData, error, success } = products;

  const getProducts = () => {
    getSellersProduct(seller._id, seller.token)
      .then(data => {
        if (data.error) {
          setProducts({ ...products, error: data.error })
        }
        else {
          setProducts({ ...products, productData: data })

        }
      })
      .catch(err => setProducts({ ...products, error: err }))

  }


  useEffect(() => {
    getProducts();
  }, [])

  const deleteThisProduct = productId => {
    deleteProduct(seller._id, productId, seller.token)
      .then(data => {
        if (data.error) {
          setProducts({ ...products, error: data.error })
          console.log(data.error);
        }
        else {
          getProducts();
          setProducts({ ...products, success: true })

        }
      })
      .catch(err => setProducts({ ...products, error: err }))
  }
  const ModalMessage = () => {

    const handleClose = () => setProducts({ ...products, success: false });
    const handleCloseError = () => setProducts({ ...products, error: false });

    if (success) {
      return (
        <Modal show={success} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, Your product has been deleted successfully !</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      )
    }

    else if (error) {
      return (
        <Modal show={error} onHide={handleCloseError}>
          <Modal.Header closeButton>
            <Modal.Title>Oops !</Modal.Title>
          </Modal.Header>
          <Modal.Body>Failed to delete the product : {error}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseError}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      )
    }
    else {
      return (<div></div>)
    }
  }

  return (
    <div className="row">
      <div className="col-3"> <SellerMenu /> </div>
      
      <div className="col-9">
        <h3 className="title">Products</h3>
        <div className="row">

          {productData.map((product, index) => (
            <div className="col-4" key={index} >

              <Card id="card__div" className="shadow-lg p-0 mb-0 bg-white rounded">
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title className="product__name">{product.name}</Card.Title>
                  <Card.Text className="product__description">
                    {product.description}
                  </Card.Text>
                </Card.Body>
<center>
                <Card.Body>
                 
                    <Link to={`/seller/update/${product._id}`}> <button className="product__edit__product__button">Edit Product</button> </Link>
                   
                  
                </Card.Body>
                </center>
              </Card>
            </div>
          ))}



        </div>
      </div>
      <ModalMessage />
    </div>
  )
}

export default ManageProducts

/* 
 <Button variant="danger" className="product__delete__product__button" width="100%" onClick={() => deleteThisProduct(product._id)}>Remove Product</Button>
 */


