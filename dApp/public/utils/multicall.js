import { providers } from '@0xsequence/multicall'
import { providers as ethersProviders, ethers } from 'ethers'
import {abi} from '../abi'
import { stakingAddress, depostiTokenAddress, rewardTokenAddress } from './variables'
import {erc20} from '../ercAbi'


export async function viewMulticall(){
    const provider = new providers.MulticallProvider(new ethersProviders.JsonRpcProvider("https://rpc-mumbai.maticvigil.com"))
    const staking = new ethers.Contract(stakingAddress, abi, provider)
    const dToken = new ethers.Contract(depostiTokenAddress, erc20, provider)
    const rToken = new ethers.Contract(rewardTokenAddress, erc20, provider)
    const [totalStakers, totalTokenLocked, dtSymbol, dtDecimals, rtSymbol, rtDecimals]  = await Promise.all([
        staking.totalStakers(),
        staking.getTotalTokenLocked(),
        dToken.symbol(),
        dToken.decimals(),
        rToken.symbol(),
        rToken.decimals()
    ]) 
    return {totalStakers, totalTokenLocked, dtSymbol, dtDecimals, rtSymbol, rtDecimals}
}


export async function userMulticall(userAddress){
    console.log('User multicall address: ', userAddress)
    const provider = new providers.MulticallProvider(new ethersProviders.JsonRpcProvider("https://rpc-mumbai.maticvigil.com"))
    const staking = new ethers.Contract(stakingAddress, abi, provider)
    const dToken = new ethers.Contract(depostiTokenAddress, erc20, provider)
    const [balance, allowance,pRewards, userInfo] = await Promise.all([
        dToken.balanceOf(userAddress),
        dToken.allowance(userAddress, stakingAddress),
        staking.checkRewards(userAddress),
        staking.stakedUser(userAddress)
    ])
    console.log(balance, allowance, pRewards, userInfo)
    return {balance, allowance, pRewards, userInfo}
}