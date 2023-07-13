import React from "react";
import style from '../styles/StakingCard.module.sass'
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useWalletClient } from 'wagmi'
import { parseUnits } from 'viem'
import { stakingAddress, depostiTokenAddress, rewardTokenAddress } from "../public/utils/variables";
import { abi } from '../public/abi'
import { erc20 } from "../public/ercAbi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StakingCard({totalToken, dTokSymbol, dtDec, balance, pRewards, rTokSymb}) {
    const [parsedAmount, setParsedAmount] = useState(0)
    const [amountToDeposit, setAmountToDeposit] = useState(0)
    const {data: walletClient} = useWalletClient() 

    useEffect(() => {
        let pAmnt = ethers.utils.parseUnits(totalToken.toString(), dtDec)
        setParsedAmount(pAmnt.toString())
    }, [totalToken, dtDec])

    console.log(`Signer`, walletClient)

    async function handleDepositAmount(value){
        setAmountToDeposit(parseUnits(value.toString(), dtDec))
        console.log(await walletClient.getAddresses())
    }

    async function approve() {
        try{
            await walletClient.writeContract({
                address: '0x86040e441e5395eFff36b870B270D697ecB7CcD0',
                abi: erc20,
                functionName: 'approve',
                account: walletClient.getAddresses()[0],
                args: [stakingAddress, amountToDeposit]
            })
            toast.success('Approved!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e){
            console.log(e.details)
            toast.error(`${e.details}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }


    return(
        <div className={style.stakCard}>
            <div className={style.mainInfo}>
                <h1>RedBird Staking</h1>
                <div>
                    <h3>{parsedAmount} {dTokSymbol}</h3>
                    <h5>TOTAL TOKEN LOKED</h5>
                </div>
            </div>

            <div>

                <div className={style.operation}>

                    <div className={style.depositBox}>
                        <h5>Balance: {balance} {dTokSymbol}</h5>
                        <div className={style.deposit}>
                            <input className={style.inputNum} placeholder="Insert amount to deposit" type="number" onChange={(e) => handleDepositAmount(e.target.value)}/>
                            <button className={style.opBut} onClick={() => approve()}>Approve</button>
                        </div>
                    </div>

                    <div className={style.claimBox}>
                        <h5>Pending Rewards: {parseFloat(pRewards).toFixed(2)} {rTokSymb}</h5>
                        <button className={style.opBut}>Claim</button>
                        
                    </div>

                    <div className={style.withdrawBox}>
                        <h5>Deposited Amount: 100.000.000</h5>
                        <div className={style.withdraw}>
                                <input className={style.inputNum} placeholder="Insert amount to withdraw" type="number" />
                                <button className={style.opBut}>Withdraw</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StakingCard