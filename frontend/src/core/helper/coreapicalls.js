import { API } from "../../backend";

export const getAllProductsForUser = () => {
    return fetch(`${API}/products`)
    .then( response => response.json() )
    .catch( err => console.log(err));
}