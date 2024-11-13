// RNAppleWallet.h

#import <React/RCTBridgeModule.h>
#import <PassKit/PassKit.h>

@interface RNAppleWallet : NSObject<RCTBridgeModule, PKAddPaymentPassViewControllerDelegate>
// ...
@end