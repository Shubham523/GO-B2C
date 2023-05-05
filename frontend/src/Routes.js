import React from 'react';
import {Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './core/Home';
import UserSignIn from "./user/Signin";
import UserSignUp from "./user/Signup";
import SellerSignIn from "./seller/SignIn";
import SellerSignUp from "./seller/SignUp";

import './styles.css'
import PrivateRoutes from './auth/helper/PrivateRoutes'
import SellerRoutes from './auth/helper/SellerRoutes'
import UserDashboard from './user/UserDashBoard'
import SellerDashboard from './seller/SellerDashBoard'
import AddCategory from './seller/AddCategory';
import AddProduct from './seller/AddProduct';
import Orders from './seller/Orders';
import ManageProducts from './seller/ManageProducts';
import UpdateProduct from './seller/UpdateProduct';
import Cart from './user/Cart';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/user/SignIn" exact component={UserSignIn} />
                <Route path="/user/SignUp" exact component={UserSignUp} />
                <Route path="/seller/SignIn" exact component={SellerSignIn} />
                <Route path="/seller/SignUp" exact component={SellerSignUp} />
                
                <PrivateRoutes path="/user/Dashboard" exact component={UserDashboard}/>
                <PrivateRoutes path="/user/Cart" exact component={Cart}/>
                <SellerRoutes path="/seller/Dashboard" exact component={SellerDashboard}/>
                <SellerRoutes path="/seller/createCategory" exact component={AddCategory}/>
                <SellerRoutes path="/seller/addProduct" exact component={AddProduct}/>
                <SellerRoutes path="/seller/Orders" exact component={Orders}/>
                <SellerRoutes path="/seller/Products" exact component={ManageProducts}/>
                <SellerRoutes path="/seller/update/:productId" exact component={UpdateProduct}/>
                
            </Switch>
        </BrowserRouter> 
    )
}

export default Routes;
