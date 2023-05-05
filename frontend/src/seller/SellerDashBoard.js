import React,{useEffect,useState} from 'react'
import { isAuthenticated, SignOut } from '../auth/helper'
import './styles/SellerDashboard.css'
import { LineChart, Line } from 'recharts';


import { FaBoxOpen, FaUserAlt, FaUserCog, FaRupeeSign,  FaShoppingCart } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsGraphUp } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { deleteProduct, getSellersProduct } from './helper/adminapicall'
import { getSellerOrders } from '../core/helper/orderHelper'

export const SellerMenu = () => {
    var username = localStorage.getItem("username");
    return (
        <div className="menu__div">
            <br />
            <ul className="menu__list">
                <li className="menu__list__data__name"><span><FaUserAlt />  </span>  {username}</li>
                <br />
                <Link  id="links"  to="/seller/Orders"><li className="menu__list__data"><span><FaBoxOpen /> </span>Orders</li> </Link>
                <Link  id="links"  to="/seller/Products"><li className="menu__list__data"><span><FaShoppingCart /> </span> Products</li> </Link>
                <Link  id="links"  to="/seller/createCategory"><li className="menu__list__data"><span><GiHamburgerMenu /> </span>Categories</li> </Link>
                <Link  id="links"  to="/seller/AddProduct"><li className="menu__list__data"> <span><BsGraphUp /> </span>Analysis</li> </Link>
                <Link  id="links"  to="/seller/AddProduct"><li className="menu__list__data"><span><FaUserCog /> </span>Account</li></Link>
                <Link  id="links"  to="/seller/AddProduct"><li className="menu__list__data" ><span><BiLogOut /> </span>Logout</li></Link>
            </ul>
        </div>
    )
}

const SellerDashBoard = () => {

    const data = isAuthenticated();
    const { firstName, lastName, email, role } = data;
    const username = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase() + lastName.slice(1)
    localStorage.setItem("username", username)
    console.log(data);



  const [products, setProducts] = useState({
    productData: [],
    error: false,
    success: false,
  });
  const [orders, setOrders] = useState({
    orderData: [],
    error: false,
    success: false,
  });
  const { productData, error, success } = products;
  const { orderData} = orders;





  const getProducts = () => {
    getSellersProduct(data._id, data.token)
      .then(data => {
        if (data.error) {
          setProducts({ ...products, error: data.error })
          
        }
        else {
          setProducts({ ...products, productData: data })

        }
      })
      .catch(err => setProducts({ ...products, error: err }))

      getSellerOrders(data._id, data.token)
      .then(orderss => {
          setOrders({...orders, orderData : orderss})

          console.log( " Orders : ", orderData)
      } )
      .catch(err => console.log(err))

  }


  useEffect(() => {
    getProducts();

  }, [])

  const getSales = () => {
      let sales = 0;
      let totalSales = 0
    orderData.map((order, index) =>{
       order.products.map((product,index)=> {
           sales = product.count *  product.price
           totalSales = totalSales + sales

       })
      })
      return totalSales; 

  }

    const wishSeller = () => {
        var today = new Date();
        var time = today.getHours()
        if (time >= 4 && time < 12) {
            return "Good Morning"
        }
        if (time >= 12 && time <= 16) {
            return "Good Afternoon"
        }
        if (time >= 17 && time < 20) {
            return "Good Evening"
        }
        if (time >= 20 && time <= 23) {
            return "Hello"
        }
    }




    const SellerCenter = () => {
        return (
            <div className="row" >
                <br />
                <div className="seller__center__name__div">
                    <h1 className="seller__center__name">{wishSeller()}  {firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase() + lastName.slice(1)}</h1>
                    <span className="seller__center__name__span">Here is what’s happening with your products today :</span>
                    <br />
                </div>

                <br />
                <div className="col-xl-3 dashboard__products shadow-lg p-3 mb-5 bg-white rounded" id ="data">
                    <h3 className="dashboard__products__description">Products</h3>
                    <center><h2 className="dashboard__products__value"> {productData.length}</h2>  </center>

                </div>
                <div className="col-xl-3 dashboard__orders shadow-lg p-3 mb-5 bg-white rounded" id ="data">
                    <h3 className="dashboard__orders__description">Orders</h3>
                    <center><h2 className="dashboard__orders__value"> {orderData.length} </h2>  </center>

                </div>
                <div className="col-xl-3 dashboard__orders shadow-lg p-3 mb-5 bg-white rounded" id ="data">
                    <h3 className="dashboard__orders__description">Sales</h3>
                    <center><h2 className="dashboard__orders__value" id="revenue"><FaRupeeSign /> {getSales()}</h2>  </center>

                </div>

            </div>
        )
    }

    const OrdersDashboard = () => {
  const data1 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page B', uv: 500, pv: 2600, amt: 2800}];
       
        return (
            <LineChart width={400} height={400} data={data1}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        )
    }

    return (
        <div className="dashboard__div" >
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3 ml-0 pl-0">
                    <SellerMenu />
                </div>
                <br />
                <div className="col-xl-9 col-lg-9 col-md-9 ml-0 pl-0" id="sellerCenterdiv">
                    <SellerCenter />
                    <br />
                    <OrdersDashboard />
                </div>
            </div>
        </div>
    )
}

export default SellerDashBoard
