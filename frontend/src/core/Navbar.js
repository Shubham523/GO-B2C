import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, SignOut } from '../auth/helper';


const Navbar = ( { history }) => {

    const data = isAuthenticated();
    
    const activeTab = ( history, path ) => {
        if( history.location.pathname === path) {
            return { color : "#FFFFFF" }
        }
        else {
            return { color : "#d1d1d1" }
        }
    }
    
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={activeTab(history, "/")} className = "nav-link" to="/">Home</Link>
                </li>

                 <li className="nav-item">
                    <Link  style={activeTab(history, "/Products")} className = "nav-link" to="/Products">Products</Link>
                </li> 
                {isAuthenticated && data.role === "user" && (
                <li className="nav-item">
                    <Link style={activeTab(history, "/user/Cart")} className = "nav-link" to="/user/Cart">Cart</Link>
                </li>  )}
                
                

                {isAuthenticated && data.role === "user" && (
                <li className="nav-item">
                    <Link style={activeTab(history, "/user/Dashboard")} className = "nav-link" to="/user/Dashboard">Dashboard</Link>
                </li> 
                )}

                {isAuthenticated && data.role === "seller" && (
                    <li className="nav-item">
                    <Link style={activeTab(history, "/seller/Dashboard")} className = "nav-link" to="/seller/Dashboard">Dashboard</Link>
                </li> 
                ) }
               
                {!isAuthenticated() && (
                     <Fragment>
                         <li className="nav-item">
                                <Link style={activeTab(history, "/user/SignUp")} className = "nav-link" to="/user/SignUp">User SignUp</Link>
                         </li> 
                         <li className="nav-item">
                                <Link style={activeTab(history, "/user/SignIn")} className = "nav-link" to="/user/SignIn"> User Login</Link>
                         </li> 
                         <li className="nav-item">
                                <Link style={activeTab(history, "/seller/SignUp")} className = "nav-link" to="/seller/SignUp">Seller SignUp</Link>
                         </li> 
                         <li className="nav-item">
                                <Link style={activeTab(history, "/seller/SignIn")} className = "nav-link" to="/seller/SignIn"> Seller Login</Link>
                         </li>
                     </Fragment> 
                )}
                {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-light" onClick={ () => {
                        SignOut(() => {
                            history.push("/")
                        });
                    }}>Log Out</span>
                </li> 
                )}
            </ul>
        </div>
    )
}

export default withRouter(Navbar);
