import React,{ useState } from 'react'
import { UserSignUp } from '../auth/helper';
import { Link } from "react-router-dom";
import './styles/SignUp.css';
import Navbar from '../core/Navbar';

const UserSignup = () => {
    
   var getFirstName = "";
   var getLastName="";

    const [ values, setValues ] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        mobileNumber : "",
        success : false,
        error : "",
        role:"user"
    }) ;



    const { firstName, lastName, email, password, mobileNumber, success, error,  role } = values;

    const handleChange = name => event => {
        setValues({ ...values, error:false, [name] : event.target.value })
    }

    const onSubmit = event => {
     
        event.preventDefault();
        setValues({...values, error:false })
        localStorage.setItem("getFirst", firstName);
        localStorage.setItem("getLast", lastName);
        UserSignUp( { firstName, lastName, email, password, mobileNumber, role} )
        .then( data => {
            if( data && data.error ) {
                setValues( { ...values, error : data.error, success: false } );
                
            }
            else {

                setValues({
                    firstName : "",
                    lastName : "",
                    email : "",
                    password : "",
                    mobileNumber : "",
                    error : "",
                    success : true,
                    role : "user"                   
                })
   
            }
            
        })
        .catch(setValues({...values, error:true,success:false}));   
    } 

  


    const errorMessage = () =>(
        <div style={ {display : error ? "" : "none"}} className = "row" >
            
                <div className="alert alert-danger">
                    <h5 id="message"> {error} </h5>
                </div>
            
        </div>    
    );

    
    const sucessMessage = () => (
        <div style={ {display : success ? "" : "none"}} className = "row" id="message">
            
                <div style={ {display : success ? "" : "none"}} className="alert alert-success">
                    <h5 id="message">Dear { getFirstName + " " + getLastName }, your account has been created Successfully <br/>
                         Please <Link to="/user/SignIn">Login Here</Link>
                    </h5>
                
            </div>
        </div>
    );
    
    const signUpForm = () => (
      <div className = "row" >    
          <div className="col-md-4 offset-sm-4 text-left">

                <h3 className="title">User SignUp</h3>
                {sucessMessage()} 
                {errorMessage()}  
                <form>
                    <div className = "form-group">
                        <label className = "text-dark">First Name </label>
                        <input value = {firstName} onChange={handleChange("firstName")} className="form-control" type="text"></input>
                    </div>
                    <div className = "form-group">
                        <label className = "text-dark">Last Name </label>
                        <input value = {lastName} onChange={handleChange("lastName")} className="form-control" type="text"></input>
                    </div>
                    <div className = "form-group">
                        <label className = "text-dark">Email</label>
                        <input value = {email} onChange={handleChange("email")} className="form-control" type="text"></input>
                    </div>
                    <div className = "form-group">
                        <label className = "text-dark">Password </label>
                        <input value = {password} onChange={handleChange("password")} className="form-control" type="password"></input>
                    </div>
                    <div className = "form-group">
                        <label className = "text-dark">Mobile Number </label>
                        <input value = {mobileNumber} onChange={handleChange("mobileNumber")} className="form-control" type="text"></input>
                    </div>
                    
                    <div className="form-group">
                            <button onClick={onSubmit} className="btn btn-dark btn-block" id="userSignUpButton">Sign Up</button>
                            <br/>
                
                            <h5 className="bottom__one">Want to be a Seller ? <Link to = "/seller/SignUp">Create an Account</Link></h5>   
                    </div>
                    
                    
                   
                    
                </form>  
          </div> 
          
      </div>
    );

    
    return (
        <div> 
            <Navbar/> 
                  
          {signUpForm()}
      
        
        </div>
    )
}

export default UserSignup;
