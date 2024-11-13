// RNAppleWallet.m

#import "RNAppleWallet.h"

@implementation RNAppleWallet

RCT_EXPORT_MODULE()

// Rest of the implementation will go here
RCT_EXPORT_METHOD(canAddCards:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  if (![PKAddPassesViewController canAddPasses]) {
      return NO;
  }
    
  if (@available(iOS 13.4, *)) {
      PKPassLibrary *passLibrary = [[PKPassLibrary alloc] init];
      return [passLibrary canAddSecureElementPassWithPrimaryAccountIdentifier:primaryAccountIdentifier];
  } else {
      return [PKAddPaymentPassViewController canAddPaymentPass];
  }
}

RCT_EXPORT_METHOD(checkIfCardIsAlreadyAdded:(NSString *)cardIdentifier
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    PKPassLibrary *library = [[PKPassLibrary alloc] init];
    NSArray<PKPaymentPass *> *passes = [library passesOfType:PKPassTypePayment];
    BOOL cardExists = NO;

    for (PKPaymentPass *pass in passes) {
        if ([pass.primaryAccountIdentifier isEqualToString:cardIdentifier]) {
            cardExists = YES;
            break;
        }
    }

    resolve(@(cardExists));
}

RCT_EXPORT_METHOD(addCardToWallet:(NSDictionary *)cardDetails
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject) {
  // Initialize the add card request configuration
  PKAddPaymentPassRequestConfiguration *config =
    [[PKAddPaymentPassRequestConfiguration alloc]
      initWithEncryptionScheme:PKEncryptionSchemeECC_V2];
  
  // Populate the configuration with data from cardDetails
  config.cardholderName = cardDetails[@"cardholderName"];
  //   ...

  // Present the add card view controller
  PKAddPaymentPassViewController *paymentPassVC =
    [[PKAddPaymentPassViewController alloc] initWithRequestConfiguration:config
                                                                delegate:self];
  if (!paymentPassVC) {
    // throw error
  }

  // Present the payment pass view controller
  UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
  [rootViewController presentViewController:paymentPassVC animated:YES completion:nil];
}


@end