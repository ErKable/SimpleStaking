import React from "react";
import { useState, useEffect } from "react";
import Layout from "./Layout";
import style from '../styles/StakingHome.module.sass'
import StakingCard from "./StakingCard";
import StakingCharts from "./StakingCharts";
import { viewMulticall } from "../public/utils/multicall";

function StakingHome(){
    const [totalStakers, setTotalStakers] = useState(0)
    const [totalTokenLocked, setTotalTokenLocked] = useState(0)
    const [dtSymbol, setDtSymbol] = useState('')
    const [dtDecimals, setDtDecimals] = useState(0)
    const [rtSymbol, setRtSymbol] = useState('')
    const [rtDecimals, setRtDecimals] = useState(0)

    useEffect(() => {
        async function multiView(){
            const {totalStakers, totalTokenLocked, dtSymbol, dtDecimals, rtSymbol, rtDecimals} = await viewMulticall()
            setTotalStakers(Number(totalStakers))
            setTotalTokenLocked(Number(totalTokenLocked))
            setDtSymbol(dtSymbol.toString())
            setDtDecimals(Number(dtDecimals))
            setRtSymbol(rtSymbol.toString())
            setRtDecimals(Number(rtDecimals))
            
           
        }
        multiView()
        //console.log(totalStakers, totalTokenLocked, dtSymbol, dtDecimals, rtSymbol, rtDecimals)
    }, [])
    
    return(
        <Layout>
            <div className={style.staking}>
                <div className={style.box}>
                    <StakingCard totalToken={totalTokenLocked} dTokSymbol={dtSymbol} dtDec={dtDecimals}/>
                </div>
                
                <div className={style.box}>
                    <StakingCharts totalStakers={totalStakers}/>
                </div>
            </div>
        </Layout>
    )
}

export default StakingHome