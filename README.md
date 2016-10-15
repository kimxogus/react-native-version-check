
# react-native-version-check
A version checker for react-native.
This library gets the latest app version by parsing google play store's app information.
Parsing code are referenced from [here](http://itmir.tistory.com/524)

## Getting started

`$ npm install react-native-version-check --save`

### Mostly automatic installation

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
* Open up `android/app/src/main/java/[...]/MainActivity.java`
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
import RNVersionCheck from 'react-native-version-check';

// TODO: What do with the module?
RNVersionCheck;
```
  
## License
MIT
