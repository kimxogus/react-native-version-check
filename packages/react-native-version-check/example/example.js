import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VersionCheck from 'react-native-version-check';

export default class example extends Component {
  state = {
    currentVersion: null,
    latestVersion: null,
    isNeeded: false,
  };
  componentDidMount() {
    VersionCheck.needUpdate({
      latestVersion: '1.0.0',
    }).then(res => this.setState(res));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Current Version: {this.state.currentVersion}
        </Text>
        <Text style={styles.text}>
          Latest Version: {this.state.latestVersion}
        </Text>
        <Text style={styles.text}>
          Is update needed?: {String(this.state.isNeeded)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
