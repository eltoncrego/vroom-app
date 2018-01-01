'use strict';
var React = require('react-native');
var {
  StyleSheet,
} = React;

import {    
  Platform,     
} from 'react-native';

module.exports = StyleSheet.create({
 /*
  * Styles
  * Author: Elton
  * Purpose: This styles the default container of the pages
  */
  container: {
    flex: 1,
    backgroundColor: GLOBAL.COLOR.DARKGRAY,
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles a global inactive text input
  */
  input_inactive: {
    backgroundColor: 'rgba(255,255,255, 0.4)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    marginVertical: 8,
    fontSize: 20,
    fontFamily: 'nunito',
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles a global active text input
  */
  input_active: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    marginVertical: 8,
    fontSize: 20,
    fontFamily: 'nunito',
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles a global green submit button
  */
  button_container:{
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 16,
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles a global green submit button's text
  */
  green_button_text:{
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'nunito',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles a global touchable opacity link's text
  */
  normal_link_text:{
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'nunito',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
    marginVertical: 8,
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles a global scrim
  */
  scrim:{
    backgroundColor: "rgba(37,50,55,0.8)",
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles a card
  */
  card_focused: {
    backgroundColor: GLOBAL.COLOR.WHITE,
    width: 260,
    height: 260,
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowRadius: 2,
    zIndex: 1,
  },
  
  /*
  * Author: Elton C. Rego
  * Purpose: Styles a card
  */
  card_unfocused: {
    backgroundColor: GLOBAL.COLOR.WHITE,
    width: 256,
    height: 256,
    marginTop: 8,
    borderRadius: 4,
    zIndex: 0,
  },

 /*
  * GROUP *
  *
  * Author: Elton C. Rego
  * Purpose: Styles global fonts
  */
  display2_accent: {
    fontSize: 70,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    fontWeight: '900',
    color: GLOBAL.COLOR.GREEN,
    backgroundColor: 'transparent',
  },
  display2_accent_center: {
    fontSize: 70,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    textAlign: 'center',
    fontWeight: Platform.os === 'android' ? null : '900',
    color: GLOBAL.COLOR.GREEN,
    backgroundColor: 'transparent',
  },
  headline2_accent: {
    fontSize: 50,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    fontWeight: '900',
    color: GLOBAL.COLOR.GREEN,
    backgroundColor: 'transparent',
  },
  headline2_accent_center: {
    fontSize: 50,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    textAlign: 'center',
    fontWeight: Platform.os === 'android' ? null : '900',
    color: GLOBAL.COLOR.GREEN,
    backgroundColor: 'transparent',
  },
  headline2: {
    fontSize: 50,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    fontWeight: '900',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  headline2_center: {
    fontSize: 50,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    textAlign: 'center',
    fontWeight: Platform.os === 'android' ? null : '900',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  title2: {
    fontSize: 30,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    fontWeight: '900',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  title2_center: {
    fontSize: 30,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    textAlign: 'center',
    fontWeight: Platform.os === 'android' ? null : '900',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
    fontFamily: 'nunito',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  title_center: {
    fontSize: 30,
    fontFamily: 'nunito',
    textAlign: 'center',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  subheader: {
    fontSize: 20,
    fontFamily: 'nunito',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  subheader_center: {
    fontSize: 20,
    fontFamily: 'nunito',
    textAlign: 'center',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  dark_subheader: {
    fontSize: 20,
    fontFamily: 'nunito',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_subheader_center: {
    fontSize: 20,
    fontFamily: 'nunito',
    textAlign: 'center',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  body2: {
    fontSize: 15,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    fontWeight: '900',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  body2_center: {
    fontSize: 15,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    textAlign: 'center',
    fontWeight: Platform.os === 'android' ? null : '900',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_title2_center: {
    fontSize: 30,
    fontFamily: Platform.os === 'android' ? 'nunito_black' : 'nunito',
    textAlign: 'center',
    fontWeight: '900',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_subheader_center: {
    fontSize: 20,
    fontFamily: 'nunito',
    textAlign: 'center',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },

  /*
   * Style: Revi Animations
   * Author: Elton C. Rego
   * Purpose: This styles the Revis on each card
   */
  revi_animations: {
    alignSelf: 'center',
    height: 256,
    width: 256,
    zIndex:2,
    marginTop: -32,
  },

});
