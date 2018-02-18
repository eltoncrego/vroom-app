// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { withNativeAd } from 'react-native-fbads';


class FacebookAd extends Component {
  render() {
    return (
      <View style={styles.ad}>
        {this.props.nativeAd.icon && (
          <Image style={styles.icon} source={{ uri: this.props.nativeAd.icon }} />
        )}
        <View style={styles.ad_text}>
          <TouchableOpacity>
            <Text style={styleguide.light_caption2}>{this.props.nativeAd.callToActionText}</Text>
          </TouchableOpacity>
          <Text style={styleguide.light_caption}>{this.props.nativeAd.description}</Text>
          {this.props.nativeAd.subtitle && (
            <Text style={styleguide.light_small_secondary}>{this.props.nativeAd.subtitle}</Text>
          )}
          <Text style={styleguide.light_small}>{this.props.nativeAd.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ad: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default withNativeAd(FacebookAd);
