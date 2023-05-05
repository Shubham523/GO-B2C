import React, { useState, useEffect } from 'react'
import { SellerMenu } from './SellerDashBoard'
import { Table } from 'react-bootstrap'
import { isAuthenticated } from '../auth/helper'
import { getSellerOrders } from '../core/helper/orderHelper'
import './styles/Orders.css';

const Orders = () => {
    const data = isAuthenticated();
   
    const [orders, setOrders] = useState({
        orderData: [],
        error: false,
        success: false,
        count: 0
    });

    const [status, setStatus] = useState();
    const [orderId, setID] = useState();


    const { orderData } = orders;

    const getOrders = () => {
        getSellerOrders(data._id, data.token)
            .then(orderss => {
                setOrders({ ...orders, orderData: orderss })

                console.log(" Orders : ", orders.orderData)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        getOrders();

    }, [])


    const handleChange = name => event => {
        const status = event.target.value;
        console.log(status);
        console.log("order is : ", orderId);
    }







    return (
        <div className="row">
            <div className="col-3">
                <SellerMenu />
            </div>
            <div className="col-9">
                <h3 className="title">Orders</h3> <br />
                <div className="col-6">
                <div className = "form-group">
                    
                <input  className="form-control" type="text" placeholder="Search Product by product name or product id"></input>
                </div>

                </div>
               
                



                <div className="table__div">
                    <br />

                    <Table bordered hover size="sm">
                        <thead>
                            <tr className="table_head_row">
                                <th className='table__heading'>Sr.No</th>
                                <th className='table__heading'>Order ID</th>
                                <th className='table__heading'>Product</th>
                                <th className='table__heading'>Price</th>
                                <th className='table__heading'>Quantity</th>
                                <th className='table__heading'>Status</th>
                            </tr>
                        </thead>
                        <tbody>


                            {orderData.map((order, index) => (
                                order.products.map((product, index1) => (
                                    <tr className="table_roww">
                                        <td className="table_row_data">{index + 1}</td>
                                        <td className="table_row_data">{order._id}</td>
                                        <td className="table_row_data">{product.name}</td>
                                        <td className="table_row_data">{product.price}</td>
                                        <td className="table_row_data">{product.count}</td>
                                        <td className="table_row_data"><select  className="select_option"
                onChange={handleChange('status')} 
              id="addproduct__input">
                <option>{order.status}</option>
                  <option>Cancelled</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                
                  
                 

            </select></td>
                                    </tr>
                                ))
                            ))}


                        </tbody>
                    </Table>
                </div>
            </div>

        </div>

    )
}

export default Orders


/* <span className="title"> <b>Filter orders by :</b> </span>
              
                
            <br/>*/
