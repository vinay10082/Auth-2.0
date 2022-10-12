import otplib from 'otplib'

otplib.authenticator.options = {
  step: 600,
  window: 2,
  digits: 6
};

const otplibAuthenticator = otplib.authenticator;

export default otplibAuthenticator