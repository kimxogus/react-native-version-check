
#import "RNVersionCheck.h"

@implementation RNVersionCheck

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}
    
- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()


- (NSString*) country
{
    return [[NSLocale currentLocale] objectForKey:NSLocaleCountryCode] ?: @"";
}

- (NSString*) packageName
{
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleIdentifier"] ?: @"";
}

- (NSString*) currentVersion
{
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"] ?: @"0";
}

- (NSString*) currentBuildNumber
{
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"] ?: @"0";
}


- (NSDictionary *)constantsToExport
{
    return @{
             @"country": self.country,
             @"packageName": self.packageName,
             @"currentVersion": self.currentVersion,
             @"currentBuildNumber": self.currentBuildNumber,
             };
}

@end
