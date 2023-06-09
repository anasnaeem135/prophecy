// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PrcToken is ERC20 {
    address private _owner;
    uint256 private _totalSupply;
    uint256 private _poolAmount;
    uint256 private _poolEndTime;
    uint256 private _poolWinnerShare;
    uint256 private _minBetAmount;
    uint256 private _numParticipants;
    uint256 private _timeLockDuration;
    uint256 private _timeLockReleaseTime;
    mapping(address => uint256) private _betAmounts;
    mapping(address => bool) private _betPlaced;
    mapping(address => bool) private _isWinner;
    mapping(address => bool) private _claimed;

    event PoolStarted(uint256 poolAmount, uint256 poolEndTime);
    event BetPlaced(address indexed participant, uint256 betAmount);
    event PoolEnded(uint256 poolWinnerShare);
    event TokensLocked(address indexed participant, uint256 amount, uint256 releaseTime);
    event TokensReleased(address indexed participant, uint256 amount);

    constructor() ERC20("PRC Token", "PRC") {
        _owner = msg.sender;
        _totalSupply = 100000 * 10**decimals();
        _mint(address(this), _totalSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the contract owner can call this function.");
        _;
    }

    function startPool(uint256 amount, uint256 endTime, uint256 minBet, uint256 lockDuration) external onlyOwner {
        require(amount > 0, "Pool amount must be greater than zero.");
        require(endTime > block.timestamp, "Pool end time must be in the future.");
        require(minBet > 0, "Minimum bet amount must be greater than zero.");
        require(lockDuration > 0, "Lock duration must be greater than zero.");

        _poolAmount = amount;
        _poolEndTime = endTime;
        _minBetAmount = minBet;
        _timeLockDuration = lockDuration;
        _timeLockReleaseTime = 0;
        _numParticipants = 0;

        emit PoolStarted(_poolAmount, _poolEndTime);
    }

    function placeBet() external {
        require(block.timestamp < _poolEndTime, "Pool has ended.");
        require(!_betPlaced[msg.sender], "Already placed a bet.");

        _betPlaced[msg.sender] = true;
        _betAmounts[msg.sender] = _minBetAmount;
        _numParticipants++;

        emit BetPlaced(msg.sender, _betAmounts[msg.sender]);

        if (_numParticipants == 10) {
            // All participants have placed a bet, check if any bets against each other
            bool betsAgainstEachOther = false;
            for (uint256 i = 0; i < 10; i++) {
                if (_betAmounts[msg.sender] > 0 && _betAmounts[msg.sender] != _betAmounts[i]) {
                    betsAgainstEachOther = true;
                    break;
                }
            }

            if (!betsAgainstEachOther) {
                // No bets against each other, return the contributed amounts
                for (uint256 i = 0; i < 10; i++) {
                    if (_betAmounts[msg.sender] > 0) {
                        _transfer(address(this), msg.sender, _betAmounts[msg.sender]);
                        _betAmounts[msg.sender] = 0;
                    }
                }
            }
        }
    }

    function endPool(bool betCorrect, uint256 totalWinnerShare) external onlyOwner {
        require(block.timestamp >= _poolEndTime, "Pool has not ended yet.");

        if (!betCorrect || totalWinnerShare == 0) {
            // No correct bet or no winner share, return the contributed amounts
            for (uint256 i = 0; i < 10; i++) {
                if (_betAmounts[msg.sender] > 0) {
                    _transfer(address(this), msg.sender, _betAmounts[msg.sender]);
                    _betAmounts[msg.sender] = 0;
                }
            }
        } else {
            // Calculate winner share percentage
            for (uint256 i = 0; i < 10; i++) {
                if (_betAmounts[msg.sender] > 0) {
                    uint256 winnerShare = (_betAmounts[msg.sender] * _poolAmount) / totalWinnerShare;
                    _transfer(address(this), msg.sender, winnerShare);
                    _isWinner[msg.sender] = true;
                }
            }
        }

        _poolWinnerShare = totalWinnerShare;
        emit PoolEnded(_poolWinnerShare);
    }

    function claimTokens() external {
        require(_isWinner[msg.sender], "Only winners can claim tokens.");
        require(!_claimed[msg.sender], "Tokens already claimed.");

        _transfer(address(this), msg.sender, 25 * 10**decimals());
        _claimed[msg.sender] = true;
    }

    function getPoolAmount() external view returns (uint256) {
        return _poolAmount;
    }

    function getPoolEndTime() external view returns (uint256) {
        return _poolEndTime;
    }

    function getNumParticipants() external view returns (uint256) {
        return _numParticipants;
    }

    function getBetAmount(address participant) external view returns (uint256) {
        return _betAmounts[participant];
    }

    function isWinner(address participant) external view returns (bool) {
        return _isWinner[participant];
    }

    function hasClaimedTokens(address participant) external view returns (bool) {
        return _claimed[participant];
    }
}
