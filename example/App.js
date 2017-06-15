import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VersionCheck from 'react-native-version-check';

export default class App extends React.Component {
  componentDidMount() {
    VersionCheck.needUpdate({
      latestVersion: '1.0.0'
    }).then(res => {
      console.log(res);
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
