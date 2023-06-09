require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
    networks: {
        bscTestnet: {
            url: process.env.API_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
    solidity: { compilers: [{ version: '0.8.0' }, { version: '0.5.0' }] },
};
