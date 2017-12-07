'use strict';
var React = require('react-native');
var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
 /*
  * Styles
  * Author: Elton
  * Purpose: This styles the container of the pages
  */
  container: {
    flex: 1,
    backgroundColor: GLOBAL.COLOR.DARKGRAY,
  },
  input_inactive: {
    backgroundColor: 'rgba(255,255,255, 0.4)',
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  input_active: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
  },

  display2_accent: {
    fontSize: 70,
    fontFamily: 'Nunito',
    fontWeight: '900',
    color: GLOBAL.COLOR.GREEN,
  },
  display2_accent_center: {
    fontSize: 70,
    fontFamily: 'Nunito',
    textAlign: 'center',
    fontWeight: '900',
    color: GLOBAL.COLOR.GREEN,
  },
  dark_subheader: {
    fontSize: 20,
    fontFamily: 'Nunito',
    color: GLOBAL.COLOR.WHITE,
  },
  dark_subheader_center: {
    fontSize: 20,
    fontFamily: 'Nunito',
    textAlign: 'center',
    color: GLOBAL.COLOR.WHITE,
  },
});
