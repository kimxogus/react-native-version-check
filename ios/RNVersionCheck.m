
#import "RNVersionCheck.h"

@implementation RNVersionCheck

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()


- (NSString*) country
{
    NSString *country = [[NSLocale currentLocale] objectForKey:NSLocaleCountryCode];
    return country;
}

- (NSString*) packageName
{
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleIdentifier"];
}

- (NSString*) currentVersion
{
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
}

- (NSString*) currentBuildNumber
{
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"];
}


- (NSDictionary *)constantsToExport
{
    UIDevice *currentDevice = [UIDevice currentDevice];
    
    NSString *uniqueId = [DeviceUID uid];
    
    return @{
             @"country": country,
             @"packageName": packageName,
             @"currentVersion": currentVersion,
             @"currentBuildNumber": currentBuildNumber,
             };
}

@end
