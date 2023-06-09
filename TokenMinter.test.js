const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TokenMinter', function () {
    let TokenMinter;
    let tokenMinter;
    let owner;
    let addr1;

    beforeEach(async function () {
        TokenMinter = await ethers.getContractFactory('TokenMinter');
        [owner, addr1] = await ethers.getSigners();

        tokenMinter = await TokenMinter.deploy();
        await tokenMinter.deployed();
    });

    it('Should mint tokens', async function () {
        const initialSupply = await tokenMinter.totalSupply();
        expect(initialSupply).to.equal(0);

        const amountToMint = ethers.utils.parseEther('100');
        await tokenMinter.connect(owner).mint(addr1.address, amountToMint);

        const balance = await tokenMinter.balanceOf(addr1.address);
        expect(balance).to.equal(amountToMint);
    });
});
