/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('hardhat-gas-reporter')
const getPrivateKey = require('./getPrivateKey')
const PRIVATE_KEY = getPrivateKey()

function set(url) {
  process.env.API_URL = url
  return url
}

module.exports = {
  solidity: '0.8.7',
  networks: {
    hardhat: {},
    ropsten: {
      url: set(process.env.ROPSTEN_API_URL),
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mainnet: {
      url: set(process.env.MAINNET_API_URL),
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
