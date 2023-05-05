import {API} from '../../backend';

export const UserSignUp = user => {

    return fetch(`${API}/UserSignUp`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then( response => {
      
        return response.json() 
    })
    .catch( err => console.log("Error Ocurred : ",err))
}

export const UserSignIn = user => {

    return fetch( `${API}/UserLogin`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(user)
    })
    .then ( response => {
       
        return response.json()
    })
    .catch( err =>  console.log("Error Occurred ", err ));

}

export const SignOut = next => {

    if(typeof window !== "undefined")
    {
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API}/UserSignOut`, {
            method:"GET"
        })
        .then( response => console.log( "Signout Successfull"))
        .catch( err => console.log("Error Occurred : ", err))
    }

   
}

export const authenticateUser = ( data , next ) => {
    if( typeof window != "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}




//This method will work for both seller and user

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false;
    }
    if(localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false;
    }
}


export const sellerSignUp = seller => {
    
   return fetch( `${API}/SellerSignUp`, {
       method : "POST",
       headers : {
           Accept : "application/json",
           "Content-Type" : "application/json"
       },
       body : JSON.stringify( seller)
   })
   .then ( response => {
       return response.json()
   })
   .catch( err => console.log("Error Occurred : ", err));

}

export const SellerLogin = seller => {
    
    return fetch( `${API}/SellerLogin`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify( seller )
    })
    .then ( response => {
        return response.json()
    })
    .catch( err => console.log("Error Occurred : ", err));
 
 }


