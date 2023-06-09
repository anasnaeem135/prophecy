const { ethers } = require('hardhat');

async function main() {
    const PrcToken = await ethers.getContractFactory('PrcToken');
    console.log('Deploying PrcToken...');
    const prcToken = await PrcToken.deploy();
    await prcToken.deployed();
    console.log('PrcToken deployed to:', prcToken.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
