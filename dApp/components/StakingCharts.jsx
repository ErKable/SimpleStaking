import React from "react";
import style from '../styles/StakingCharts.module.sass'
import Charts from "./Charts";

function StakingCharts({totalStakers, pRewards, tierInfo}) {
    console.log('tier info', tierInfo)
    return(
        <div className={style.mainCharts}>

            <div className={style.infoBox}>
                <div className={style.info}>
                    <div className={style.textInfo}>
                        Total Stakers
                        <p>{totalStakers}</p>
                    </div>
                    <div className={style.chartInfo}>
                        <Charts/>
                    </div>
                </div>
            </div>

            <div className={style.infoBox}>
                <div className={style.info}>
                    <div className={style.textInfo}>
                        Pending Rewards
                        <p>{pRewards}</p>
                    </div>
                    <div className={style.chartInfo}>
                        <Charts/>
                    </div>
                </div>
            </div>

            <div className={style.infoBox}>
                <div className={style.info}>
                    <div className={style.textInfo}>
                        Tier
                    </div>
                    <p>TierLevel: {tierInfo[0]} RPB: {tierInfo[1].toString()}</p>
                    <div className={style.chartInfo}>
                        <Charts/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StakingCharts