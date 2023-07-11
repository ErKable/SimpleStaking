import React from "react";
import style from '../styles/StakingCharts.module.sass'
import Charts from "./Charts";

function StakingCharts({totalStakers}) {
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
                    <div className={style.chartInfo}>
                        <Charts/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StakingCharts