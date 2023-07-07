import React from "react";
import style from '../styles/StakingCard.module.sass'

function StakingCard() {

    return(
        <div className={style.stakCard}>
            <div className={style.mainInfo}>
                <h1>SimpleStaking</h1>
                <h3>999.999.999 DT</h3>
                <h5>TOTAL TOKEN LOKED</h5>
            </div>

            <div>

                <div className={style.operation}>

                    <div className={style.depositBox}>
                        <h5>Balance: 100.000.000</h5>
                        <div className={style.deposit}>
                            <input className={style.inputNum} placeholder="Insert amount to deposit" type="number" />
                            <button className={style.opBut}>Deposit</button>
                        </div>
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