// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Timer.sol";

contract PrcToken is ERC20 {
    address private _owner;
    uint256 private _totalSupply;
    Timer private _timer;

    struct PoolParticipant {
        uint256 betAmount;
        uint256 prediction;
        bool rewarded;
        address timeLock;
    }

    mapping(address => PoolParticipant) private _poolParticipants;
    address[] private _participants;
    uint256 private _endTime;

    mapping(address => uint256) private _claimTimers;

    constructor() ERC20("PRC Token", "PRC") {
        _owner = msg.sender;
        _totalSupply = 100000 * 10**decimals();
        _mint(_owner, _totalSupply);
        _timer = new Timer();
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the contract owner can call this function.");
        _;
    }

    function enterPool(uint256 betAmount, uint256 prediction, uint256 lockDuration) external {
        require(betAmount > 0, "Bet amount must be greater than zero.");
        require(prediction >= 0 && prediction <= 100, "Prediction must be between 0 and 100.");
        require(_poolParticipants[msg.sender].betAmount == 0, "Already entered the pool.");

        address timeLock = address(new TimeLock(address(this), lockDuration, msg.sender));
        _poolParticipants[msg.sender] = PoolParticipant(betAmount, prediction, false, timeLock);
        _participants.push(msg.sender);

        // Transfer tokens to the time lock contract
        _transfer(msg.sender, timeLock, betAmount);
    }

    function endPool(uint256 currentPrice) external onlyOwner {
        require(_endTime == 0, "Pool has already ended.");
        require(_participants.length >= 10, "Not enough participants in the pool.");

        _endTime = block.timestamp;

        uint256 totalPoolAmount;
        uint256 totalWinningAmount;

        for (uint256 i = 0; i < _participants.length; i++) {
            address participant = _participants[i];
            PoolParticipant storage p = _poolParticipants[participant];

            totalPoolAmount += p.betAmount;

            if (p.prediction == currentPrice) {
                totalWinningAmount += p.betAmount;
                p.rewarded = true;
            }
        }

        if (totalWinningAmount == 0) {
            return; // No winners, return without distributing rewards
        }

        for (uint256 i = 0; i < _participants.length; i++) {
            address participant = _participants[i];
            PoolParticipant storage p = _poolParticipants[participant];

            if (p.rewarded) {
                uint256 rewardAmount = (p.betAmount * totalPoolAmount * 2) / (totalWinningAmount * 100);
                _mint(participant, rewardAmount);
            } else {
                // Transfer back the bet amount from the time lock contract
                TimeLock(p.timeLock).releaseTokens();
            }
        }
    }

    function claimTokens() external {
        require(_claimTimers[msg.sender] == 0, "Tokens can only be claimed once every 2 hours.");
        require(balanceOf(address(this)) >= 25, "Insufficient tokens in contract balance.");

        _claimTimers[msg.sender] = block.timestamp;

        _transfer(address(this), msg.sender, 25);
    }

    function getReleaseTime(address participant) public view returns (uint256) {
        return TimeLock(_poolParticipants[participant].timeLock).getReleaseTime();
    }
}

contract TimeLock {
    address private _owner;
    uint256 private _lockDuration;
    uint256 private _releaseTime;
    IERC20 private _token;
    uint256 private _amount;

    constructor(address tokenAddress, uint256 lockDuration, address owner) {
        require(tokenAddress != address(0), "Invalid token address.");
        require(lockDuration > 0, "Lock duration must be greater than zero.");
        require(owner != address(0), "Invalid owner address.");

        _owner = owner;
        _lockDuration = lockDuration;
        _releaseTime = block.timestamp + lockDuration;
        _token = IERC20(tokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the contract owner can call this function.");
        _;
    }

    function lockTokens(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero.");
        require(_token.balanceOf(address(this)) == 0, "Tokens are already locked.");

        _amount = amount;
        _token.transferFrom(msg.sender, address(this), amount);
    }

    function releaseTokens() external onlyOwner {
        require(block.timestamp >= _releaseTime, "Tokens are still locked.");

        uint256 balance = _token.balanceOf(address(this));
        require(balance == _amount, "Tokens are already released or not locked correctly.");

        _token.transfer(_owner, balance);
    }

    function getReleaseTime() external view returns (uint256) {
        return _releaseTime;
    }
}
