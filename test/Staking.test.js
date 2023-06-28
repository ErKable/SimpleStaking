const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe(`Simple staking test`, function(){

    let dToken
    let dTokenAddress

    let rToken
    let rTokenAddress

    let staking
    let stakingAddress

    let owner
    let ownerAddress

    let user = []
    let userAddress = []

    it(`Test init`, async function(){
        owner = ethers.provider.getSigner(0)
        ownerAddress = await owner.getAddress()

        console.log(`Owner address ${ownerAddress}`)

        for(let i = 0; i < 10; i++){
            user[i] = ethers.provider.getSigner(i+1)
            userAddress[i] = await user[i].getAddress()
            console.log(`Temp user ${i + 1} address: ${userAddress[i]}`)
        }
    })

    it(`Should deploy deposit token and reward token`, async function(){
        dToken = await(await(await ethers.getContractFactory('rewardToken', owner)).deploy()).deployed()
        dTokenAddress = dToken.address 
        console.log(`Deposit token deployed to: ${dTokenAddress}`)

        rToken = await(await(await ethers.getContractFactory('depositToken', owner)).deploy()).deployed()
        rTokenAddress = rToken.address
        console.log(`Reward token deployed to: ${rTokenAddress}`)
    })

    it(`Should deploy the staking`, async function(){
        staking = await(await(await ethers.getContractFactory('Staking', owner)).deploy(dTokenAddress, rTokenAddress, [100, 1000, 10000], 86400)).deployed()
        stakingAddress = staking.address
        console.log(`Staking deployed to ${stakingAddress}`)
    })

    it(`Should fund the staking`, async function(){
        let ownerBalance = await rToken.balanceOf(ownerAddress)
        console.log(`Reward token owner balance: ${ownerBalance}`)
        var stakingBalance = await rToken.balanceOf(stakingAddress)
        console.log(`Staking reward token balance: ${stakingBalance}`)

        let approve = await rToken.approve(stakingAddress, ownerBalance)
        await approve.wait()

        await staking.fundStaking(ownerBalance)
        stakingBalance = await rToken.balanceOf(stakingAddress)
        console.log(`Staking funded with ${stakingBalance} reward tokens`)
    })

    it(`Should fund users with deposit token`, async function(){
        for(let i = 0; i < userAddress.length; i++){
            await dToken.transfer(userAddress[i], '100000000000000000000000')
            let tempUserBal = await dToken.balanceOf(userAddress[i])
            console.log(`Temp user ${userAddress[i]} balance: ${tempUserBal}`)
        }
    })

    it(`Should deposit with users`, async function(){
        for(let i = 0; i < user.length; i++){
            await dToken.connect(user[i]).approve(stakingAddress, "100000000000000000000000")

            await staking.connect(user[i]).deposit('100000000000000000000000', '86400')
            console.log(`User ${userAddress[i]} has deposited`)
        }
    })

})