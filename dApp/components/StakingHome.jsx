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
import { publicClient } from "./StakingCard";
import { abi } from '../public/abi'

function StakingHome(){
    const [totalStakers, setTotalStakers] = useState(0)
    const [totalTokenLocked, setTotalTokenLocked] = useState(0)
    const [dtSymbol, setDtSymbol] = useState('')
    const [dtDecimals, setDtDecimals] = useState(0)
    const [rtSymbol, setRtSymbol] = useState('')
    const [rtDecimals, setRtDecimals] = useState(0)

    const [dTBalance, setDtBalance] = useState(0)
    const [pRewards, setPRewards] = useState(0)
    const [userInfo, setUserInfo] = useState()
    const [allowance, setAllowance] = useState(0)
    const [tierInfo, setTierInfo] = useState([])
    const {data: walletClient} = useWalletClient()
    const {address, isConnected} = useAccount()

    useEffect(() => {
        async function multiView(){
            const {totalStakers, totalTokenLocked, dtSymbol, dtDecimals, rtSymbol, rtDecimals} = await viewMulticall()
            setTotalStakers(Number(totalStakers))
            setTotalTokenLocked(formatUnits(totalTokenLocked, dtDecimals ? dtDecimals : 18))
            console.log(formatUnits(totalTokenLocked, dtDecimals ? dtDecimals : 18))
            setDtSymbol(dtSymbol.toString())
            setDtDecimals(Number(dtDecimals))
            setRtSymbol(rtSymbol.toString())
            setRtDecimals(Number(rtDecimals))          
        }
        multiView()
    }, [])

    useEffect(() => {
        async function userMultiview(){
            console.log('useEffect address: ', address)
            const {balance, allowance, pRewards, userInfo} = await userMulticall(address)
            setDtBalance(formatUnits(balance, dtDecimals ? dtDecimals : 18))
            setPRewards(formatUnits(pRewards, rtDecimals ? rtDecimals : 18))
            setUserInfo(userInfo)
            setAllowance(Number(allowance))
        }
        isConnected ? 
        userMultiview() : 
        null
    }, [walletClient, address])

    useEffect(() => {
        async function getTier(){
            const data = await publicClient.readContract({
                address: '0x04fcda1a2478388FF0Ea011fC1Aa4FD027E7f136',
                abi: abi,
                functionName: 'checkTier',
                args: [userInfo[1]]
            })
            setTierInfo(data)
        }
        getTier()

    }, [userInfo])
    
    console.log('balance: ', dTBalance)
    console.log('p reward: ', pRewards)
    console.log('user info: ', userInfo)
    return(
        <Layout>
            <div className={style.staking}>
                <div className={style.box}>
                    <StakingCard totalToken={totalTokenLocked} dTokSymbol={dtSymbol} dtDec={dtDecimals} balance={dTBalance}
                    pRewards={pRewards} rTokSymb={rtSymbol} userInfo={userInfo} allowance={allowance}/>
                </div>
                
                <div className={style.box}>
                    <StakingCharts totalStakers={totalStakers} pRewards={pRewards} tierInfo={tierInfo}/>
                </div>
            </div>
        </Layout>
    )
}

export default StakingHome