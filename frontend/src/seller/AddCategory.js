import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import { FaBoxOpen, FaUserAlt, FaUserCog } from 'react-icons/fa'
import { MdCheckBox } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsGraphUp } from 'react-icons/bs'
import { GrLogout } from 'react-icons/gr'
import './styles/AddCategory.css'
import { createCategory } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { SellerMenu } from './SellerDashBoard';



const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const seller = isAuthenticated();




    const handleChange = event => {
        setError("");
        setName(event.target.value);

    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("")
       
        createCategory(seller._id, seller.token, { name }).then(data => {
            if (data.err) {
                setError(true)
                setSuccess(false)
                console.log(data.err)
            }
            else {
                setSuccess(true)
            }
        })
            .catch((err) => console.log(err))
    }




    return (
        <div className="row">
            <div className="col-3">
                <SellerMenu />
            </div>
            <div className="col-9">
                <div>
                    <h1>Add Category</h1>
                    <br />
                    <div className="col-5 ">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label className="category__label"> Category Name </label>
                                <input value={name} autofocus type="text" className="form-control" width="40px" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-dark btn-block" id="userSignUpButton">Add Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default AddCategory
