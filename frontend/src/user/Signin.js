import React,{ useState } from 'react';
import { isAuthenticated } from '../auth/helper/index';
import { authenticateUser, UserSignIn } from '../auth/helper/index';
import {Redirect} from 'react-router-dom';
import Navbar from '../core/Navbar';

const UserSignin = () => {
    
   const [ values, setValues] = useState({
       email : "",
       password : "",
       error : "",
       success : "",
       loading: "",
       didRedirect : "",
   });

   const { email, password, error, success, loading, didRedirect} = values;
   const { user } = isAuthenticated();
 
   const handleChange = name => event => {
    setValues({...values, error:false, [name] : event.target.value })
   }

   const onSubmit = event => {
       event.preventDefault();
       setValues({...values, error:false, loading:true }) 
       UserSignIn({ email, password })
       .then ( data => {
           if(data && data.error ) {
               setValues({...values, error : data.error, loading : false, didRedirect:false})
           }
           else {
               authenticateUser(data, () => {
                   setValues({...values, didRedirect : true })
               })
           }
       })
       .catch( setValues({...values, error:true, didRedirect:false }) )
   }

   const errorMessage = () =>(
        <div style={ {display : error ? "" : "none"}} className = "row" >
            <div className="col-md-4 offset-sm-4 text-left">
                <div className="alert alert-danger">
                    <h5> {error} </h5>
                </div>
            </div>
        </div>    
    );


    const loadingMessage = () => {
      
            return( loading && (<div className="alert alert-success">Loading .....</div> ));
        
    }

    const performRedirect = () => {
        if(didRedirect)
         {
            
                return <Redirect to="/user/Dashboard" />

        }
        if(isAuthenticated()) {
            console.log("its working fine")
        }
    }
   
    const signInForm = () => {

      return(
        <div className = "row" >
        <div className="col-md-4 offset-sm-4 text-left">
           
          <h3>User Login</h3>
         <br/><br/>
          <form>
              <div className = "form-group">
                  <label className = "text-dark">Email </label>
                  <input value={email} onChange={handleChange("email")} className="form-control" type="text"></input>
              </div>
              <br/>
              <div className = "form-group">
                  <label className = "text-dark">Password </label>
                  <input value={password} onChange={handleChange("password")} className="form-control" type="password"></input>
              </div>
              <br/>
              <div className="form-group">
                        <button onClick={onSubmit} id="userSignUpButton" className="btn btn-dark btn-block">Login</button>
                </div>
             </form> 
        </div>
        </div>
      )
         
    };

    return (
        <div>
             <Navbar/>
            {signInForm()}
            <br/>
            {loadingMessage()}
            {errorMessage()}
            {performRedirect()}
           
            
           
        </div>
    )
}

export default UserSignin;
