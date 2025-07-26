import React from 'react'
import { Link, Route, Routes, useRoutes } from 'react-router'
import styles from '../../Styles/admin.module.css'
import { Box } from '@chakra-ui/react'
import AdminHome from './AdminHome'
import Orders from './Orders'
import Products from './Products'

export default function Admin() {

    const {path, url} = useRoutes();
  return (
    <div>
        <nav> 
            <ul className={styles.adminMenu}>
                <li><Link to={url}>Home</Link></li>
                <li><Link to={`${url}/orders`}>Orders</Link></li>
                <li><Link to={`${url}/orders`}>Products </Link></li>
            </ul>
        </nav>
        <Box mt={10}>
            <Routes>
                <Route exact path={path} element={<AdminHome/>}/>
                <Route path={`${path}/orders`} element={<Orders/>}/>
                <Route path={`${path}/products`} element={<Products/>}/>
            </Routes>
        </Box>
    </div>
  )
}
