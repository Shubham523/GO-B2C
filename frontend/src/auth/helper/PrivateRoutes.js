import React from 'react'
import {Redirect, Route} from 'react-router-dom';
import { isAuthenticated } from './index';


const PrivateRoutes = ({component : Component, ...rest }) => {
  const user = isAuthenticated(); 
  return (
    <Route
      {...rest}
      render={ props =>
        isAuthenticated() && user.role === "user" ? (
            <Component {...props} />
        )
        :
        (
        <Redirect
            to={{
              pathname: "/user/SignIn",
              state: { from: props.location }
            }}
          />
        )

      }
    />
  ); 
        
    
}

export default PrivateRoutes
