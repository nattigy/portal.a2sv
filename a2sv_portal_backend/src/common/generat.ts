const GenerateOTP = () =>
  Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000
export default GenerateOTP