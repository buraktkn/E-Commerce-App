import React from 'react'
import { Link } from "react-router-dom";
import styles from '../Styles/navbar.module.css'
import { Button } from "@chakra-ui/react"
import { useAuth } from "../Contexts/AuthContext";
import { useBasket } from '../Contexts/BasketContext';


export default function Navbar() {

  const {basketItems} = useBasket();
  const {loggedIn, user} = useAuth();
  //console.log("LoggedIn", loggedIn);
  //console.log(basketItems)
  

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
            {loggedIn && 
            <>
              {
                Array.isArray(basketItems) &&  basketItems.length > 0 && (
                  <Link to="/basket">
                    <Button colorPalette={"red"} variant={"outline"}>
                      Basket ({basketItems.length})
                    </Button>
                  </Link>
                )
              }
              {
                user?.role === 'admin' && (
                  <Link to={'/admin'}>
                    <Button colorPalette={'pink'}>Admin</Button>
                  </Link>
                )
              }
              <Link to="/profile"><Button colorPalette="blue">Profile</Button></Link>
            </>
            }
          </div>
        </nav>
    </div>
  )
}
