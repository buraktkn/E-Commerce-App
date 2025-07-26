import React from 'react'
import { Link } from 'react-router'
import styles from '../Styles/admin.module.css'

export default function Admin() {
  return (
    <div>
        <nav>
            <ul className={styles.adminMenu}>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/'}>Orders</Link></li>
                <li><Link to={'/'}>Products </Link></li>
            </ul>
        </nav>
    </div>
  )
}
