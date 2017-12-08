'use strict';
var React = require('react-native');
var {
  StyleSheet,
} = React;

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
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
    fontSize: 20,
    fontFamily: 'Nunito',
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles a global active text input
  */
  input_active: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
    fontSize: 20,
    fontFamily: 'Nunito',
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles a global green submit button
  */
  green_button_container:{
    backgroundColor: GLOBAL.COLOR.GREEN,
    borderRadius: 4,
    padding: 16,
    marginVertical: 32,
  },

 /*
  * Author: Elton C. Rego
  * Purpose: Styles a global green submit button's text
  */
  green_button_text:{
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Nunito',
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
    fontFamily: 'Nunito',
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
  * GROUP *
  *
  * Author: Elton C. Rego
  * Purpose: Styles global fonts
  */
  display2_accent: {
    fontSize: 70,
    fontFamily: 'Nunito',
    fontWeight: '900',
    color: GLOBAL.COLOR.GREEN,
    backgroundColor: 'transparent',
  },
  display2_accent_center: {
    fontSize: 70,
    fontFamily: 'Nunito',
    textAlign: 'center',
    fontWeight: '900',
    color: GLOBAL.COLOR.GREEN,
    backgroundColor: 'transparent',
  },
  dark_subheader: {
    fontSize: 20,
    fontFamily: 'Nunito',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_subheader_center: {
    fontSize: 20,
    fontFamily: 'Nunito',
    textAlign: 'center',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
});
