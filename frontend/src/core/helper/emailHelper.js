import { API } from "../../backend"



export const sendEmailToUserHelper = (data) => {
    return fetch(`${API}/email`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json",
        },
        body:JSON.stringify(data)
    })
}

export const sendEmailToSellerHelper = (data) => {
    return fetch(`${API}/email/seller`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json",
        },
        body:JSON.stringify(data)
    })
}