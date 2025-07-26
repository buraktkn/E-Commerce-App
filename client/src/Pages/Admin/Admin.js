import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import styles from '../../Styles/admin.module.css'
import { Box } from '@chakra-ui/react'
import AdminHome from './AdminHome'
import Orders from './Orders'
import Products from './Products'


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
            </Routes>
        </Box>
    </div>
  )
}
