import { providers } from '@0xsequence/multicall'
import { providers as ethersProviders, ethers } from 'ethers'
import {abi} from './abi'

export async function viewMulticall(){
    const provider = new providers.MulticallProvider(new ethersProviders.JsonRpcProvider("https://rpc-mumbai.maticvigil.com"))
    
}