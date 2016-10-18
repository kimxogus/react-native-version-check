
# react-native-version-check
A version checker for react-native.
This library gets the latest app version by parsing google play store's app information.
Parsing code are referenced from [here](http://itmir.tistory.com/524)

## Getting started

`$ npm install react-native-version-check --save`


### installation

#### iOS
 - Not supported yet

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

console.log(VersionCheck.getPackageName());        // com.reactnative.app
console.log(VersionCheck.getCurrentBuildNumber()); // 10
console.log(VersionCheck.getCurrentVersion());     // 0.1.1

VersionCheck.getLatestVersion()
    .then((latestVersion) => {
        console.log(latestVersion);    // 0.1.2
    });

VersionCheck.needUpdate()
    .then((res) => {
        console.log(res.isNeeded);    // true
    });
    
VersionCheck.needUpdate(2)
    .then((res) => {
        console.log(res.isNeeded);    // false; because first two fields of current and the lastest versions are the same as "0.1".
    });
    
```

## Methods

- **`getPackageName()`** _(String)_ - Returns package name of app.
- **`getCurrentBuildNumber()`** _(Number)_ - Returns current app build number.
- **`getCurrentVersion()`** _(String)_ - Returns current app version.
- **`getLatestVersion()`** _(Promise)_ - Returns the latest app version parsed from market. Returns `null` when parsing error occurs.
- **`needUpdate(depth : Number, delimiter : String)`** _(Promise)_ - Returns `{ isNeeded: true, currentVersion: currentVersion, latestVersion: latestVersion }` if app needs update, `{ isNeeded: false, currentVersion: currentVersion, latestVersion: latestVersion }` otherwise. Current and the latest app versions are first splitted by delimiter(`'.'` by default), and check each splitted numbers into depth(`Infinity` by default).
  
## License
MIT
