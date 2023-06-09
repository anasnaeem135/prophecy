// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PrcToken is ERC20 {
    address private _owner;
    uint256 private _totalSupply;

    struct PoolParticipant {
        uint256 betAmount;
        uint256 prediction;
        bool rewarded;
        uint256 lockDuration;
        uint256 lockTime;
    }

    mapping(address => PoolParticipant) private _poolParticipants;
    address[] private _participants;
    uint256 private _endTime;
    uint256 private _claimInterval = 2 hours;

    mapping(address => uint256) private _claimTimers;

    constructor() ERC20("PRC Token", "PRC") {
        _owner = msg.sender;
        _totalSupply = 100000 * 10**decimals();
        _mint(_owner, _totalSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the contract owner can call this function.");
        _;
    }

    function enterPool(uint256 betAmount, uint256 prediction, uint256 lockDuration) external {
        require(betAmount > 0, "Bet amount must be greater than zero.");
        require(prediction >= 0 && prediction <= 100, "Prediction must be between 0 and 100.");
        require(_poolParticipants[msg.sender].betAmount == 0, "Already entered the pool.");

        _poolParticipants[msg.sender] = PoolParticipant(
            betAmount,
            prediction,
            false,
            lockDuration,
            block.timestamp
        );
        _participants.push(msg.sender);

        // Transfer tokens to the contract
        _transfer(msg.sender, address(this), betAmount);
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
                // Transfer back the bet amount to the participant
                _transfer(address(this), participant, p.betAmount);
            }
        }
    }

    function claimTokens() external {
        require(_poolParticipants[msg.sender].lockTime > 0, "You have not entered the pool.");
        require(_claimTimers[msg.sender] == 0 || block.timestamp >= _claimTimers[msg.sender], "Tokens can only be claimed once every 2 hours.");
        require(balanceOf(address(this)) >= 25, "Insufficient tokens in contract balance.");

        _claimTimers[msg.sender] = block.timestamp + _claimInterval;
        _transfer(address(this), msg.sender, 25);
    }
}
