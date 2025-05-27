import React from 'react'
import { Link } from "react-router-dom";
import styles from '../Styles/navbar.module.css'
import { Button } from "@chakra-ui/react"


export default function Navbar() {
  return (
    <div>
        <nav className={styles.nav}>
          <div className={styles.left}>
            <div className={styles.logo}>
                <Link to="/">eCommerce</Link>
            </div>
            <ul className={styles.menu}>
                <li><Link to="/">Products</Link></li>
            </ul>
          </div>
          
          <div className={styles.right}>
            <Link to="/signin"><Button colorPalette="green">Log In</Button></Link> 
            <Link to="/signup"><Button colorPalette="blue">Register</Button></Link>
          </div>
        </nav>
    </div>
  )
}
