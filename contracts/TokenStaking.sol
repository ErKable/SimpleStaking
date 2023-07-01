//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./rewartdToken.sol";
import "./depositToken.sol";
contract Staking is Ownable{

    enum rewardTier{
        Low,
        Medium,
        High
    }

    struct userInfo {
        uint256 depositBlock;
        uint256 lastClaimBlock;
        uint256 depositedAmount;
        uint256 lockedUntil;
        rewardTier userRewardTier;
    }

    struct rewardPerBlock {
        uint256 tierOne;
        uint256 tierTwo;
        uint256 tierThree;
    }

    depositToken public dToken;
    rewardToken public rToken;
    uint256 public rTokenBalance;
    uint256 public minimumDepositTime;
    rewardPerBlock public rewards;
    uint256 public totalStakers;
    mapping(address => bool) public hasDeposited;
    mapping(address => userInfo) public stakedUser;


    event StakingCreated(uint256 indexed at);
    event PoolFunded(uint256 indexed at, uint256 indexed amount);
    event UserStaked(address indexed user, uint256 indexed depositedAmount, uint256 indexed at);

    constructor(address _tokenToDeposit, address _rewardToken, uint256[] memory _rewardPerBlock, uint256 _minimumDepositTime)  {
        require(_rewardPerBlock.length > 0, "RPB too short");
        require(_rewardPerBlock.length < 4, "RPB too long");
        dToken = depositToken(_tokenToDeposit);
        rToken = rewardToken(_rewardToken);
        rewards.tierOne = _rewardPerBlock[0];
        rewards.tierTwo = _rewardPerBlock[1];
        rewards.tierThree = _rewardPerBlock[2];
        minimumDepositTime = _minimumDepositTime;
        emit StakingCreated(block.timestamp);
    }

    function fundStaking(uint256 amount) external onlyOwner{
        require(rToken.balanceOf(msg.sender) > amount - 1, "Not enought balance");
        rTokenBalance += amount;
        rToken.transferFrom(msg.sender, address(this), amount);
        emit PoolFunded(block.timestamp, amount);
    }

    function deposit(uint256 amount, uint256 depositTime) external {
        require(dToken.balanceOf(msg.sender) > amount - 1, "Not enought balance");
        require(depositTime > minimumDepositTime - 1, "Deposit time too low");
        hasDeposited[msg.sender] = true;
        (rewardTier tier,) = checkTier(amount);
        stakedUser[msg.sender] = userInfo(block.number, block.number, amount, block.timestamp + depositTime, tier);
        ++totalStakers;
        dToken.transferFrom(msg.sender, address(this), amount);
        emit UserStaked(msg.sender, amount, block.timestamp);
    }

    function claimRewards() public {
        require(hasDeposited[msg.sender], "Cannot claim if not deposited");
        uint256 rewardAmount = checkRewards(msg.sender);
        stakedUser[msg.sender].lastClaimBlock = block.number;
        rToken.transfer(msg.sender, rewardAmount);
    }

    function withdraw() external{
        userInfo memory tempInfo = stakedUser[msg.sender];
        require(tempInfo.lockedUntil < block.timestamp, "Timelock not expired yet");
        claimRewards();
        delete stakedUser[msg.sender];
        --totalStakers;
        dToken.transfer(msg.sender, tempInfo.depositedAmount);
    }

    function checkRewards(address _stakedUser) public view returns(uint256 rewardAmount) {
        userInfo memory tempInfo = stakedUser[_stakedUser];
        uint256 currentBlock = block.number;
        uint256 passedBlock = currentBlock - tempInfo.lastClaimBlock;
        (,uint256 amount) = checkTier(tempInfo.depositedAmount);
        rewardAmount = passedBlock * amount;
    }

    function checkTier(uint256 amount) public view returns(rewardTier tier, uint256 tokenPerBlock) {
        rewardPerBlock memory tempTier = rewards;
        if(amount < tempTier.tierOne){
            tier = rewardTier.Low;
            tokenPerBlock = rewards.tierOne;
        } else if(amount > tempTier.tierOne && amount < tempTier.tierTwo) {
            tier = rewardTier.Medium;
            tokenPerBlock = rewards.tierTwo;
        } else if (amount > tempTier.tierThree){
            tier = rewardTier.High;
            tokenPerBlock = rewards.tierThree;
        }
    }

    function getTotalTokenLocked() external view returns(uint256 stakingBalance){
        stakingBalance = dToken.balanceOf(address(this));
    }
    
}