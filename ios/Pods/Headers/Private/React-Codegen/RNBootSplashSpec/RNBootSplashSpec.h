/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleObjCpp
 *
 * We create an umbrella header (and corresponding implementation) here since
 * Cxx compilation in BUCK has a limitation: source-code producing genrule()s
 * must have a single output. More files => more genrule()s => slower builds.
 */

#ifndef __cplusplus
#error This file must be compiled as Obj-C++. If you are importing it, you must change your file extension to .mm.
#endif
#import <Foundation/Foundation.h>
#import <RCTRequired/RCTRequired.h>
#import <RCTTypeSafety/RCTConvertHelpers.h>
#import <RCTTypeSafety/RCTTypedModuleConstants.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTCxxConvert.h>
#import <React/RCTManagedPointer.h>
#import <ReactCommon/RCTTurboModule.h>
#import <optional>
#import <vector>

namespace JS {
  namespace NativeRNBootSplash {
    struct Constants {

      struct Builder {
        struct Input {
          RCTRequired<bool> darkModeEnabled;
          std::optional<double> logoSizeRatio;
          std::optional<double> navigationBarHeight;
          std::optional<double> statusBarHeight;
        };

        /** Initialize with a set of values */
        Builder(const Input i);
        /** Initialize with an existing Constants */
        Builder(Constants i);
        /** Builds the object. Generally used only by the infrastructure. */
        NSDictionary *buildUnsafeRawValue() const { return _factory(); };
      private:
        NSDictionary *(^_factory)(void);
      };

      static Constants fromUnsafeRawValue(NSDictionary *const v) { return {v}; }
      NSDictionary *unsafeRawValue() const { return _v; }
    private:
      Constants(NSDictionary *const v) : _v(v) {}
      NSDictionary *_v;
    };
  }
}
@protocol NativeRNBootSplashSpec <RCTBridgeModule, RCTTurboModule>

- (void)hide:(BOOL)fade
     resolve:(RCTPromiseResolveBlock)resolve
      reject:(RCTPromiseRejectBlock)reject;
- (void)isVisible:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject;
- (facebook::react::ModuleConstants<JS::NativeRNBootSplash::Constants::Builder>)constantsToExport;
- (facebook::react::ModuleConstants<JS::NativeRNBootSplash::Constants::Builder>)getConstants;

@end
namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeRNBootSplash'
   */
  class JSI_EXPORT NativeRNBootSplashSpecJSI : public ObjCTurboModule {
  public:
    NativeRNBootSplashSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react
inline JS::NativeRNBootSplash::Constants::Builder::Builder(const Input i) : _factory(^{
  NSMutableDictionary *d = [NSMutableDictionary new];
  auto darkModeEnabled = i.darkModeEnabled.get();
  d[@"darkModeEnabled"] = @(darkModeEnabled);
  auto logoSizeRatio = i.logoSizeRatio;
  d[@"logoSizeRatio"] = logoSizeRatio.has_value() ? @((double)logoSizeRatio.value()) : nil;
  auto navigationBarHeight = i.navigationBarHeight;
  d[@"navigationBarHeight"] = navigationBarHeight.has_value() ? @((double)navigationBarHeight.value()) : nil;
  auto statusBarHeight = i.statusBarHeight;
  d[@"statusBarHeight"] = statusBarHeight.has_value() ? @((double)statusBarHeight.value()) : nil;
  return d;
}) {}
inline JS::NativeRNBootSplash::Constants::Builder::Builder(Constants i) : _factory(^{
  return i.unsafeRawValue();
}) {}