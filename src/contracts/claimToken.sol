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
    return(balanceOf(address(this)));
}


}
