const { API } = require("../../backend");

export const getMeToken = (userId, token) => {
    return fetch(`${API}payment/getUserToken/${userId}`,{
        method: "GET",
        headers:{
            
            Authorization : `Bearer ${token}`
        },
    })
    .then( response => response.json() )
    .catch( err => console.log( err ))

}



export const processPayment = (userId, token, paymentInfo) => {
    
    return fetch(`${API}payment/processPayment/${userId}`,{
        method:"POST",
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(paymentInfo)
    })
    .then( response => response.json() )
    .catch( err => console.log( err ))


}