export const configuration = {
  // When you're ready to accept live payments, change the value to one of our live environments.
  environment: 'test',
  clientKey: 'YOUR_CLIENT_KEY',
  // For iOS, this is the URL to your app. For Android, this is automatically overridden by AdyenCheckout.
  returnUrl: 'your-app://',
  // Must be included to show the amount on the Pay button.
  countryCode: 'NL',
  amount: { currency: 'EUR', value: 1000 }
}

export const configurationAW: Configuration = {
  environment: 'test', // When you're ready to accept real payments, change the value to a suitable live environment.
  clientKey: 'YOUR_CLIENT_KEY',
  returnUrl: 'your-app://',
  countryCode: 'NL',
  amount: {
      currency: 'EUR',
      value: 1000
  },
  applepay: {
    merchantID: 'APPLE_PAY_MERCHANT_ID',
    merchantName: 'APPLE_PAY_MERCHANT_NAME'
  }
};