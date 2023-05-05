
import { API } from "../../backend";

//categories
export const createCategory = (sellerId, token, category) => {
    return fetch(`${API}category/create/${sellerId}`,{
        method : "POST",
        headers:{
            Accept : "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category),
    })
    .then( response => response.json() )
    .catch(  err  => console.log(err))
};

// categories
export const getAllCategories = () => {
    return fetch(`${API}categories`, {
        method : "GET", 
    })
    .then( response => response.json())
    .catch(err => console.log(err))
}

export const addCategory = (sellerId, token, category) => {
    return fetch(`${API}category/create/${sellerId}`, {
        method:"POST",
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category),
       
    })
    .then( response => response.json())
    .catch(err => console.log(err))
}

export const updateCategory = (sellerId, token, categoryId, category) => {
    return fetch(`${API}category/${categoryId}/${sellerId}`,{
        method : "PUT",
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category),
    })
    .then( response => response.json())
    .catch(err => console.log(err))
}

export const deleteCategory = (sellerId, token, categoryId) =>  {
    return fetch(`${API}category/${categoryId}/${sellerId}`,{
        method : "DELETE",
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
    })
    .then( response => response.json())
    .catch(err => console.log(err))
}

// product 

export const createProduct = (sellerId, token, product) => {
    return fetch(`${API}product/create/${sellerId}`, {
        method : "POST",
        headers:{
            Accept : "application/json",
            Authorization : `Bearer ${token}`,
          
        },
        body : product
    })
    .then( response => response.json())
    .catch(err => console.log(err))
}


export const getSellersProduct =(sellerId, token) => {
    return fetch(`${API}products/${sellerId}`,{
        method: "GET",
        headers:{
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
    })
    .then( response => response.json())
    .catch(err => console.log(err))
}

export const getSingleProduct = productId => {
    return fetch(`${API}product/${productId}`, {
        method : "GET"
    })
    .then( response => response.json())
    .catch(err => console.log(err))
}

export const getAllProducts = () => {
    return fetch(`${API}products`, {
        method : "GET"
    })
    .then( response => response.json())
    .catch(err => console.log(err))

}

export const updateProduct = (sellerId, productId, token, product) => {
    return fetch(`${API}product/${productId}/${sellerId}`, {
        method : "PUT",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}` 
        },
        body : product
    })
    .then( response => response.json())
    .catch(err => console.log(err))
}

export const deleteProduct = (sellerId,productId, token) => {
    return fetch(`${API}product/${productId}/${sellerId}`, {
        method : "DELETE",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}` 
        },   
    })
    .then( response => response.json())
    .catch(err => console.log(err))
} 
