import React from 'react'
import {Redirect, Route} from 'react-router-dom';
import { isAuthenticated } from './index';
 


const SellerRoutes = ({component : Component, ...rest }) => { 
  const seller = isAuthenticated();
  return (
    <Route
      {...rest}
      render={ props =>
        isAuthenticated() && seller.role === "seller" ? (
            <Component {...props} />
        )
        :
        (

        <Redirect
            to={{
              pathname: "/seller/SignIn",
              state: { from: props.location }
            }}
          />
        )

      }
    />
  ); 
        
    
}

export default SellerRoutes;
