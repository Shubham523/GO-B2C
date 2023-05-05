import { API } from "../../backend";

export const invoiceHelper = (invoiceData) => {
    console.log("Invoice Data : ", invoiceData);

    return fetch(`${API}invoice`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json",
        },
        body:JSON.stringify(invoiceData),
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}