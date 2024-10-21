function randomOtp(numberOfDigits) {
  return String(Math.floor(Math.random() * Number(`9` + `0`.repeat(numberOfDigits - 1))) + Number(`1` + `0`.repeat(numberOfDigits - 1)));
}
module.exports = { randomOtp };
