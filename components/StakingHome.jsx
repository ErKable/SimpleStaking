import React from "react";
import { useState, useEffect } from "react";
import Layout from "./Layout";
import style from '../styles/StakingHome.module.sass'
import StakingCard from "./StakingCard";
import StakingCharts from "./StakingCharts";
import { viewMulticall, userMulticall } from "../public/utils/multicall";
import { useWalletClient } from 'wagmi'
import { useAccount } from 'wagmi'
import { formatUnits } from 'viem'

function StakingHome(){
    const [totalStakers, setTotalStakers] = useState(0)
    const [totalTokenLocked, setTotalTokenLocked] = useState(0)
    const [dtSymbol, setDtSymbol] = useState('')
    const [dtDecimals, setDtDecimals] = useState(0)
    const [rtSymbol, setRtSymbol] = useState('')
    const [rtDecimals, setRtDecimals] = useState(0)

    const [dTBalance, setDtBalance] = useState(0)
    const {data: walletClient} = useWalletClient()
    const {address} = useAccount()

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

    useEffect(() => {
        async function userMultiview(){
            console.log('useEffect address: ', address)
            const {balance, pRewards, userInfo} = userMulticall(address)
            setDtBalance(formatUnits(Number(balance), dtDecimals))
            console.log(Number(balance), pRewards, userInfo)
        }
        userMultiview()
    }, [walletClient, address])
    
    console.log('balance: ', dTBalance)
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