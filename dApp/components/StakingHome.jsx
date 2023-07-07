import React from "react";
import Layout from "./Layout";
import style from '../styles/StakingHome.module.sass'
import StakingCard from "./StakingCard";

function StakingHome(){

    return(
        <Layout>
            <div className={style.staking}>
                <div>
                    <StakingCard />
                </div>
                
                <div>
                    DX
                </div>
            </div>
        </Layout>
    )
}

export default StakingHome