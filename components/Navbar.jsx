import React from "react";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import style  from '../styles/Navbar.module.sass'
import Image from "next/image";


function Navbar() {

    return(
        <nav className={style.navbar}>
            <div>
                <Image src={'./fakeLogo.svg'} height={100} width={100} alt={'hey'} />
            </div>
            <div>
                <ConnectButton/>
            </div>
        </nav>
    )
}

export default Navbar