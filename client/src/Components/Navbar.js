import React from 'react'
import { Link } from "react-router-dom";
import styles from '../Styles/navbar.module.css'
import { Button } from "@chakra-ui/react"
import { useAuth } from "../Contexts/AuthContext";


export default function Navbar() {

  const {loggedIn} = useAuth();
  console.log("LoggedIn", loggedIn);
  

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
            {!loggedIn && 
            <>
            <Link to="/signin"><Button colorPalette="green">Log In</Button></Link> 
            <Link to="/signup"><Button colorPalette="blue">Register</Button></Link>
            </>}
            {loggedIn && <>
            <Link to="/profile"><Button colorPalette="black">Profile</Button></Link>
            </>}
          </div>
        </nav>
    </div>
  )
}
