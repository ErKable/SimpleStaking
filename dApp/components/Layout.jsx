import React from "react";
import style from '../styles/Layout.module.sass'
import Navbar from './Navbar'

function Layout({children}) {
    return(
        <div className={style.mainLayout}>
            <Navbar/>
            <main className={style.main}>
                {children}
            </main>
        </div>
    )
}

export default Layout