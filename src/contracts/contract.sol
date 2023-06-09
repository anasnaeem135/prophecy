// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PrcToken is ERC20 {
    address private _owner;
    uint256 private _totalSupply;
    mapping(address => uint256) private _lastClaimTime;

    uint256 private constant CLAIM_INTERVAL = 2 hours;
    uint256 private constant CLAIM_AMOUNT = 25 * 10**decimals();

    constructor() ERC20("PRC Token", "PRC") {
        _owner = msg.sender;
        _totalSupply = 100000 * 10**decimals();
        _mint(_owner, _totalSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the contract owner can call this function.");
        _;
    }

    function pool(uint256 betAmount, uint256 prediction) external {
        require(betAmount > 0, "Bet amount must be greater than zero.");
        require(prediction >= 0 && prediction <= 100, "Prediction must be between 0 and 100.");

        // Perform necessary logic for the pool
        // For simplicity, let's assume the prediction is correct
        uint256 rewardAmount = betAmount * 2; // Reward is double the bet amount

        // Mint reward tokens to the user
        _mint(msg.sender, rewardAmount);
    }

    function claimTokens() external {
        require(_lastClaimTime[msg.sender] == 0 || block.timestamp >= _lastClaimTime[msg.sender] + CLAIM_INTERVAL, "Tokens can only be claimed once every 2 hours.");

        _lastClaimTime[msg.sender] = block.timestamp;
        _mint(msg.sender, CLAIM_AMOUNT);
    }
}
