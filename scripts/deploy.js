const { ethers } = require("hardhat");

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

async function scriptInit(){
    owner = ethers.provider.getSigner(0)
    ownerAddress = await owner.getAddress()
    console.log(`Owner address ${ownerAddress}`)
    for(let i = 0; i < 4; i++){
        user[i] = ethers.provider.getSigner(i+1)
        userAddress[i] = await user[i].getAddress()
        console.log(`User ${i+1} address: ${userAddress[i]}`)
    }
}

async function depositAndTestTokenDeploy(){
    dToken = await(await(await ethers.getContractFactory('rewardToken', owner)).deploy()).deployed()
    dTokenAddress = dToken.address 
    console.log(`Deposit token deployed to: ${dTokenAddress}`)

    rToken = await(await(await ethers.getContractFactory('depositToken', owner)).deploy()).deployed()
    rTokenAddress = rToken.address
    console.log(`Reward token deployed to: ${rTokenAddress}`)
}

async function deployStaking(){
    staking = await(await(await ethers.getContractFactory('Staking', owner)).deploy(dTokenAddress, rTokenAddress, [100, 1000, 10000], 86400)).deployed()
    stakingAddress = staking.address
    console.log(`Staking deployed to ${stakingAddress}`)
}

async function fundStaking(){
    let ownerBalance = await rToken.balanceOf(ownerAddress)
        console.log(`Reward token owner balance: ${ownerBalance}`)
        var stakingBalance = await rToken.balanceOf(stakingAddress)
        console.log(`Staking reward token balance: ${stakingBalance}`)

        let approve = await rToken.approve(stakingAddress, ownerBalance)
        await approve.wait()

        await staking.fundStaking(ownerBalance)
        stakingBalance = await rToken.balanceOf(stakingAddress)
        console.log(`Staking funded with ${stakingBalance} reward tokens`)
}

async function fundUsers(){
    for(let i = 0; i < user.length; i++){
        let tx = await dToken.transfer(userAddress[i], '100000000000000000000000')
        await tx.wait()
        let tempUserBal = await dToken.balanceOf(userAddress[i])
        console.log(`Temp user ${userAddress[i]} balance: ${tempUserBal}`)
    }
}

async function run(){
    await scriptInit()
    await depositAndTestTokenDeploy()
    await deployStaking()
    await fundStaking()
    await fundUsers()
}

run()