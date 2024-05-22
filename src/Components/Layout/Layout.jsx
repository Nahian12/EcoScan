import React from 'react'
import { Link } from 'react-router-dom'
import MyNavbar from './MyNavbar'

const Layout = ({children}) => {
  return (
    <div>
        {/* <header> */}
            <MyNavbar />
        {/* </header> */}
        <main>
            {children}
        </main>
    </div>
  )
}

export default Layout
