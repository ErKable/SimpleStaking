import React from "react";
import Layout from "./Layout";
import style from '../styles/StakingHome.module.sass'
import StakingCard from "./StakingCard";
import StakingCharts from "./StakingCharts";
function StakingHome(){

    return(
        <Layout>
            <div className={style.staking}>
                <div className={style.box}>
                    <StakingCard />
                </div>
                
                <div className={style.box}>
                    <StakingCharts />
                </div>
            </div>
        </Layout>
    )
}

export default StakingHome