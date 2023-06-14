// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PrcToken is ERC20 {
    // address private _owner;
    uint256 private _totalSupply;

    mapping(address => uint256) private _lastClaimTime;
    uint256 private constant _claimInterval = 2 hours;

    constructor() ERC20("PRC Token", "PRC") {
        // _owner = msg.sender;
        _totalSupply = 100000 * 10**decimals();
        _mint(address(this), _totalSupply);
    }

    // modifier onlyOwner() {
    //     require(msg.sender == _owner, "Only the contract owner can call this function.");
    //     _;
    // }

    function claimTokens(address recipient) external {
        require(_lastClaimTime[recipient] + _claimInterval <= block.timestamp, "Tokens can only be claimed once every 2 hours.");
        require(balanceOf(address(this)) >= 25, "Insufficient tokens in contract balance.");

        _lastClaimTime[recipient] = block.timestamp;
        _transfer(address(this), recipient, 25);
    }

    function getContractBalance() public view returns (uint256) {
        return balanceOf(address(this));
    }

    struct Pool {
        uint256 startTime;
        uint256 endTime;
        uint256 totalAmount;
        mapping(address => uint256) participantAmounts;
        mapping(address => bool) participantBets;
        address[] participants;
        bool finalized;
    }

    Pool private _currentPool;

    function startPool(uint256 poolDuration) external {
        require(_currentPool.startTime == 0, "A pool is already active.");

        _currentPool.startTime = block.timestamp;
        _currentPool.endTime = block.timestamp + poolDuration;
        _currentPool.finalized = false;
    }

    function enterPool(bool betLong, uint256 amount) external {
        require(_currentPool.startTime != 0, "No active pool available.");
        require(block.timestamp < _currentPool.endTime, "Pool entry closed.");
        require(amount > 0, "Invalid amount.");

        // Transfer required amount of PRC tokens from the participant to the pool
        require(transfer(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, amount), "Failed to transfer tokens.");

        // Store the participant's amount and bet
        _currentPool.participantAmounts[msg.sender] = amount;
        _currentPool.participantBets[msg.sender] = betLong;
        _currentPool.participants.push(msg.sender);
        _currentPool.totalAmount += amount;
    }

    function endPool(uint256 currentPrice, uint256 originalPrice) external {
        require(_currentPool.startTime != 0, "No active pool available.");
        require(block.timestamp >= _currentPool.endTime, "Pool still active.");
        require(!_currentPool.finalized, "Pool already finalized.");

        _currentPool.finalized = true;

        uint256 winnersCount = 0;
        uint256 totalWinningAmount = 0;

        for (uint256 i = 0; i < _currentPool.participants.length; i++) {
            address participant = _currentPool.participants[i];
            uint256 participantAmount = _currentPool.participantAmounts[participant];
            bool participantBetLong = _currentPool.participantBets[participant];

            bool isWinner;
            if (participantBetLong && currentPrice > originalPrice) {
                isWinner = true;
            } else if (!participantBetLong && currentPrice < originalPrice) {
                isWinner = true;
            }

            if (isWinner) {
                winnersCount++;
            } 
            totalWinningAmount += participantAmount; // Add 5 additional tokens as winnings
            // else {
                // Return the participant's amount
                // require(transfer(participant, participantAmount), "Failed to return tokens to participant.");
            // }
        }

        uint256 perWinnerAmount = totalWinningAmount / winnersCount;

        for (uint256 i = 0; i < _currentPool.participants.length; i++) {
            address participant = _currentPool.participants[i];
            bool participantBetLong = _currentPool.participantBets[participant];

            if (participantBetLong && currentPrice > originalPrice) {
                require(transfer(participant, perWinnerAmount), "Failed to transfer winnings to participant.");
            } else if (!participantBetLong && currentPrice < originalPrice) {
                require(transfer(participant, perWinnerAmount), "Failed to transfer winnings to participant.");
            }
        }

        // Reset the pool for the next round
        delete _currentPool;
    }
}
