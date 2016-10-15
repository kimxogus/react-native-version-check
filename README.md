
# react-native-version-check
A version checker for react-native.
This library gets the latest app version by parsing google play store's app information.
Parsing code are referenced from [here](http://itmir.tistory.com/524)

## Getting started

`$ npm install react-native-version-check --save`

### Automatic installation

`$ react-native link react-native-version-check`

### Manual installation


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


console.log(VersionCheck.getCurrentVersion());  // 0.2.3
console.log(VersionCheck.getLatestVersion());   // 0.2.4


console.log(VersionCheck.needUpdate());   // true
console.log(VersionCheck.needUpdate(2));  // false
```

## Methods

- **`getCurrentVersion()`** _(String)_ - Returns current app version.
- **`getLatestVersion()`** _(String)_ - Returns the latest app version parsed from market. Returns `null` when parsing error occurs.
- **`needUpdate(depth : Number, delimiter : String)`** _(Bool)_ - Returns `true` if app needs update, `false` otherwise. Current and the latest app versions are first splitted by delimiter(`'.'` by default), and check each splitted numbers into depth(`Infinity` by default).
  
## License
MIT
