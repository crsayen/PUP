const { expect } = require('chai')

describe('PUP', () => {
  it('should work lol', async () => {
    const token = await ethers.getContractFactory('PUP')
    await token.deploy()
    expect(true).to.be.true
  })
})
