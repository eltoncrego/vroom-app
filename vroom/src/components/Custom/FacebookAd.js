// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

import {
  View,
  Text,
} from 'react-native';
import { withNativeAd } from 'react-native-fbads';


class FacebookAd extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.nativeAd.description}</Text>
      </View>
    );
  }
}

export default withNativeAd(FacebookAd);
