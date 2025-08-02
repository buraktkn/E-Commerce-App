import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import styles from '../../Styles/admin.module.css'
import { Box } from '@chakra-ui/react'
import AdminHome from './AdminHome'
import Orders from './Orders'
import Products from './Products'
import ProductUpdate from './ProductUpdate'
import NewProduct from './NewProduct'


export default function Admin() {
  return (
    <div>
        <nav> 
            <ul className={styles.adminMenu}>
                <li><Link to="/admin">Home</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
                <li><Link to="/admin/products">Products </Link></li>
            </ul>
        </nav>
        
        <Box mt={10}>
            <Routes>
                <Route index element={<AdminHome/>}/>
                <Route path='orders' element={<Orders/>}/>
                <Route path='products' element={<Products/>}/>
                <Route path='products/new' element={<NewProduct/>}/>
                <Route path='products/:product_id' element={<ProductUpdate/>}/>
            </Routes>
        </Box>
    </div>
  )
}
