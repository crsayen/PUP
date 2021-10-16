require('dotenv').config()

const getkey = require('../getPrivateKey')
const [, , net, metadata] = process.argv

if (!metadata) throw 'must include metadata URL'

const API_URL = {
  ropsten: process.env.ROPSTEN_API_URL,
  mainnet: process.env.MAINNET_API_URL,
}[net]

const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = getkey()

const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(API_URL)

const contract = require('../artifacts/contracts/PUP.sol/PUP.json')
const contractAddress = process.env.CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  try {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest')
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce,
      gas: 500000,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    const signedTx = await signPromise
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) =>
      console.log(err ? 'something went wrong' : 'transaction hash:', hash)
    )
  } catch (err) {
    console.log('ERROR: ', err)
  }
}

mintNFT(metadata)
