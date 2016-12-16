# react-native-version-check

[![npm version][npm-image]][npm-url]
[![npm downloads][downloads-image]][downloads-url]

A version checker for react-native.
This library gets the latest app version by parsing google play store, apple app store's app information or custom url.
Parsing code is referenced from [here](http://itmir.tistory.com/524)

## Getting started

`$ npm install react-native-version-check --save`


### installation

#### iOS
* Add ```.xcodeproj``` file as library to XCode project.  
  1. In project navigator, right click Libraries    
  2. Select ```Add Files to [PROJECT_NAME]```
  3. Add the ```node_modules/react-native-version-check/ios/RNVersionCheck.xcodeproj``` file

* Add the ```libRNVersionCheck.a``` from the ```RNVersionCheck``` project to your project's Build Phases > Link Binary With Libraries 


#### Android

* Append the following lines to `android/settings.gradle`:
```gradle
...
include ':react-native-version-check'
project(':react-native-version-check').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-version-check/android')
```
* Insert the following lines inside the dependencies block in `android/app/build.gradle`:
```gradle
...
dependencies {
   ...
   compile project(':react-native-version-check')
}
```
* Open up `android/app/src/main/java/[...]/MainApplication.java`
```java
......
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;  // <--- HERE

......

@Override
protected List<ReactPackage> getPackages() {
   ......
   new RNVersionCheckPackage()            // <------ HERE
   ......
}
```

## Usage
```javascript
import VersionCheck from 'react-native-version-check';

// START: iOS Only

VersionCheck.setAppID(APP_ID);                    // Your App ID for App Store URL
VersionCheck.setAppName(APP_NAME);                // Your App Name for App Store URL

// Your app's id, name and country info will be use for App Store URL like
// https://itunes.apple.com/{COUNTRY}/app/{APP_NAME}/id{APP_ID}

// END: iOS Only

console.log(VersionCheck.getCountry());            // KR
console.log(VersionCheck.getPackageName());        // com.reactnative.app
console.log(VersionCheck.getCurrentBuildNumber()); // 10
console.log(VersionCheck.getCurrentVersion());     // 0.1.1

VersionCheck.getLatestVersion()
    .then(latestVersion => {
        console.log(latestVersion);    // 0.1.2
    });

VersionCheck.getLatestVersion({
  forceUpdate: true,
  url: "https://path.to/your/version/api",   // You can get latest version from your own api.
  fetchOptions: {
    method: "GET",
    headers: {
      "x-custom-header": "param"
    }
  }
}).then((latestVersion) =>{
  console.log(latestVersion);
});

VersionCheck.needUpdate()
    .then(res => {
        console.log(res.isNeeded);    // true
    });
    
VersionCheck.needUpdate({
  depth: 2
}).then(res => {
  console.log(res.isNeeded);
  // false; because first two fields of current and the latest versions are the same as "0.1".
});

VersionCheck.needUpdate({
  currentVersion: "1.0",
  latestVersion: "2.0"
}).then(res => {
  console.log(res.isNeeded);  // true
});

```

## Methods

- <a name="setAppID" href="#setAppID">#</a>**`setAppID(appId : Number)`** _()_ - Sets app id of application for App Store Url. **[Required only for iOS Apps]**
- <a name="setAppName" href="#setAppName">#</a>**`setAppName(appName : String)`** _()_ - Sets app name of application for App Store Url. **[Required only for iOS Apps]**
- <a name="getCountry" href="#getCountry">#</a>**`getCountry()`** _(String)_ - Returns device's country code of 2 characters.
- <a name="getPackageName" href="#getPackageName">#</a>**`getPackageName()`** _(String)_ - Returns package name of app.
- <a name="getCurrentBuildNumber" href="#getCurrentBuildNumber">#</a>**`getCurrentBuildNumber()`** _(Number)_ - Returns current app build number.
- <a name="getCurrentVersion" href="#getCurrentVersion">#</a>**`getCurrentVersion()`** _(String)_ - Returns current app version.
- <a name="getLatestVersion" href="#getLatestVersion">#</a>**`getLatestVersion(option : object)`** _(Promise <latestVersion>)_ - Returns the latest app version parsed from url. Returns `null` when parsing error occurs.
  - Option  
  
    Field | Type | Default  
    --- | --- | ---  
    forceUpdate | _boolean_ | ```false```  
    url | _string_ | store url using app info  
    fetchOptions | _object_ | isomorphic-fetch options (https://github.github.io/fetch/)  
    
- <a name="needUpdate" href="#needUpdate">#</a>**`needUpdate(option : object)`** _(Promise)_ - Returns an object contains with boolean value whether update needed, current version and latest version. Current and the latest app versions are first split by delimiter, and check each split numbers into depth.
  - Option  
  
    Field | Type | Default   
    --- | --- | ---  
    currentVersion | _string_ | app's current version from [getCurrentVersion()](#getCurrentVersion)
    latestVersion | _string_ | app's latest version from [getLatestVersion()](#getLatestVersion)
    depth | _number_ | ```Infinity```
    delimiter | _string_ | ```"."```
    forceUpdate | _boolean_ | ```false```  
    url | _string_ | store url using app info  
    fetchOptions | _object_ | isomorphic-fetch options (https://github.github.io/fetch/)  
    
  - Result
  
    Field | Type   
    --- | ---  
    isNeeded | _boolean_
    currentVersion | _string_
    latestVersion | _string_



## License
MIT


[npm-image]: https://img.shields.io/npm/v/react-native-version-check.svg
[npm-url]: https://npmjs.org/package/react-native-version-check
[downloads-image]: https://img.shields.io/npm/dm/react-native-version-check.svg
[downloads-url]: https://npmjs.org/package/react-native-version-check
