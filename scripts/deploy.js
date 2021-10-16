const { ethers } = require('hardhat')

async function main() {
  const NFT = await ethers.getContractFactory('PUP')
  const nft = await NFT.deploy()
  console.log('PUP contract deployed to ', nft.address)
}

main()
