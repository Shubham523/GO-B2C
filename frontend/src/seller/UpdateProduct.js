import React,{useState, useEffect} from 'react';
import { SellerMenu } from './SellerDashBoard';
import { isAuthenticated } from '../auth/helper';
import {getSingleProduct, getAllCategories, updateProduct } from './helper/adminapicall';
import './styles/AddProduct.css'
import { Modal, Button } from 'react-bootstrap'

const UpdateProduct = ({match}) => {
    const sellerData = isAuthenticated();

    const [values, setValues] = useState({
      name: "",
      description: "",
      price: "",
      quantity: "",
      image: "",
      categories: [],
      category: "",
      loading: false,
      createdProduct: "",
      error: false,
      getaRedirect: false,
      formData: "",
      success: false,
      errorDetails: "",
      seller: sellerData._id,
      id:"",
    })
  
    const { name, description, price, quantity, image, categories, category, loading,
      createdProduct, error, getaRedirect, formData, success, errorDetails, seller,id
    } = values;
  
    const ModalMessage = () => {
  
      const handleClose = () => setValues({ ...values, success: false });
      const handleCloseError = () => setValues({ ...values, error: false });
  
      if (success) {
        return (
          <Modal show={success} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, Your product {createdProduct} has been updated successfully !</Modal.Body>
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
              <Modal.Title>Oops ! We Cannot update your Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorDetails}</Modal.Body>
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
  
    const handleChange = name => event => {
      const value = name === "image" ? event.target.files[0] : event.target.value;
  
      formData.set(name, value);
      formData.set("seller", sellerData._id);
      setValues({ ...values, [name]: value })
    }

    const loadCategories = () => {
      getAllCategories().then(data => {
        if(data.error) {
          setValues({ ...values, error: data.error })
        }
        else{
          setValues({ ...values, categories: data,  formData: new FormData()})
        }
      })
      .catch(err => console.log(err));
    }
  
    const preLoad = (productId) => { 

    

      getSingleProduct(productId)
        .then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error })
            console.log(data.error);
          }
          else {
           
            setValues({
                ...values,
                name: data.name,
                description: data.description,
                price: data.price,
                quantity:data.quantity,
                image: "",
                category : data.category._id,
                formData : new FormData(),
                loading: false,
                id:data._id,
                error:false

              })
              loadCategories();
              console.log(values)

             
          }
        })
        .catch( err => console.log(err))
  
    }
  
    useEffect(() => {
      preLoad(match.params.productId);
    }, []);
  
    const onSubmit = event => {
      event.preventDefault();
  
      setValues({ ...values, error: false, loading: true })
      updateProduct(sellerData._id, id, sellerData.token, formData)
        .then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false, errorDetails: data.error })
  
          }
          else {
  
            setValues({
              ...values,
              createdProduct: name,
              name: "",
              description: "",
              price: "",
              quantity: "",
              image: "",
              loading: false,
  
              success: true,
            })
  
          }
        })
        .catch(err => console.log(err))
    }
  
  
  
  
    return (
      <div className="row" >
        <div className="col-3">
          <SellerMenu />
        </div>
        <div className="col-5 offset-2">
          <form >
            <br />
            <center><h2 className="form-group">Update Product</h2> </center>
            <br />
            <div className="form-group">
              <label className="text-dark">Photo</label> <br />
              <label className="btn btn-block btn-dark" id="photo_input">
                <input
                  onChange={handleChange("image")}
                  type="file"
                  name="image"
                  accept="image"
                  placeholder="Choose a File"
                  width="100%"
                  className="photo_input"
  
                />
              </label>
            </div>
            <div className="form-group">
              <br />
              <label className="text-dark">Name</label> <br />
              <input
                onChange={handleChange("name")}
                name="photo"
                className="form-control"
                id="addproduct__input"
                value={name}
              />
            </div>
            <div className="form-group">
              <br />
              <label className="text-dark">Description</label> <br />
              <textarea
                onChange={handleChange("description")}
                name="photo"
                className="form-control"
                id="addproduct__input"
                value={description}
              />
            </div>
            <div className="form-group">
              <br />
              <label className="text-dark">Price</label> <br />
              <input
                onChange={handleChange("price")}
                type="number"
                className="form-control"
                id="addproduct__input"
                value={price}
              />
            </div>
            <div className="form-group">
              <br />
              <label className="text-dark">Category</label> <br />
              <select
                onChange={handleChange("category")}
                className="form-control"
                id="addproduct__input"
              >
                {categories && (
                  categories.map((cate, index) => (
                    <option key={index} value={cate._id}>{cate.name}</option>
                  ))
                )}
  
              </select>
            </div>
            <div className="form-group">
              <br />
              <label className="text-dark">Quantity</label> <br />
              <input
                onChange={handleChange("quantity")}
                type="number"
                className="form-control"
                placeholder="0"
                value={quantity}
                id="addproduct__input"
              />
            </div>
            <br />
  
  
            <button type="submit" id="userSignUpButton" onClick={onSubmit} className="btn btn-dark">
              Update Product
            </button>
          </form>
          <ModalMessage />
        </div>
      </div>
    )
}

export default UpdateProduct
