const Cryptr = require('cryptr')
const prompt = require('prompt-sync')()

module.exports = () => {
  const pw = prompt('password: ', null, { echo: '*' })
  const re = RegExp('[a-f0-9]{64}')
  const key = new Cryptr(pw).decrypt(process.env.ENCRYPTED_KEY)
  if (!re.test(key)) throw 'incorrect password'
  return key
}
