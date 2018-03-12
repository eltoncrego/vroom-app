// Necessary imports and declarations
'use strict';
var React = require('react-native');
var {StyleSheet,} = React;

// Allows for cross-platform functionality
import {Platform,} from 'react-native';

/*
* Stylesheet: Styleguide
* Author: Elton C. Rego
* Purspose: Provide global stylings to the entire application,
*   please import as styleguide from this file's path. Light
*   and dark modifiers refer to the color of the background,
*   not the color of the text itself
*/
module.exports = StyleSheet.create({
  
 /*
  * Styles
  * Author: Elton
  * Purpose: This styles the default container of the pages
  */
  container: {
    flex: 1,
  },

 /*
  * GROUP * Font Styles
  *
  * Author: Elton C. Rego
  * Purpose: Styles global fonts
  */
  light_display: {
    fontSize: 50,
    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_display2: {
    fontSize: 50,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_display_secondary: {
    fontSize: 50,
    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_display2_secondary: {
    fontSize: 50,
    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_display_disabled: {
    fontSize: 50,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_display2_disabled: {
    fontSize: 50,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_display_accent: {
    fontSize: 50,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  light_display2_accent: {
    fontSize: 50,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_display: {
    fontSize: 50,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_display2: {
    fontSize: 50,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_display_secondary: {
    fontSize: 50,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_display2_secondary: {
    fontSize: 50,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_display_disabled: {
    fontSize: 50,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_display2_disabled: {
    fontSize: 50,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_display_accent: {
    fontSize: 50,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_display2_accent: {
    fontSize: 50,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },


  light_headline: {
    fontSize: 35,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_headline2: {
    fontSize: 35,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_headline_secondary: {
    fontSize: 35,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_headline2_secondary: {
    fontSize: 35,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_headline_disabled: {
    fontSize: 35,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_headline2_disabled: {
    fontSize: 35,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_headline_accent: {
    fontSize: 35,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  light_headline2_accent: {
    fontSize: 35,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_headline: {
    fontSize: 35,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_headline2: {
    fontSize: 35,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_headline_secondary: {
    fontSize: 35,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_headline2_secondary: {
    fontSize: 35,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_headline_disabled: {
    fontSize: 35,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_headline2_disabled: {
    fontSize: 35,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_headline_accent: {
    fontSize: 35,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_headline2_accent: {
    fontSize: 35,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },


  light_title: {
    fontSize: 25,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_title2: {
    fontSize: 25,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_title_secondary: {
    fontSize: 25,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_title2_secondary: {
    fontSize: 25,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_title_disabled: {
    fontSize: 25,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_title2_disabled: {
    fontSize: 25,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_title_accent: {
    fontSize: 25,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  light_title2_accent: {
    fontSize: 25,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_title: {
    fontSize: 25,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_title2: {
    fontSize: 25,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_title_secondary: {
    fontSize: 25,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_title2_secondary: {
    fontSize: 25,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_title_disabled: {
    fontSize: 25,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_title2_disabled: {
    fontSize: 25,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_title_accent: {
    fontSize: 25,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_title2_accent: {
    fontSize: 25,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },


  light_subheader: {
    fontSize: 20,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_subheader2: {
    fontSize: 20,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_subheader_secondary: {
    fontSize: 20,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_subheader2_secondary: {
    fontSize: 20,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_subheader_disabled: {
    fontSize: 20,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_subheader2_disabled: {
    fontSize: 20,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_subheader_accent: {
    fontSize: 20,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  light_subheader2_accent: {
    fontSize: 20,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_subheader: {
    fontSize: 20,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_subheader2: {
    fontSize: 20,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_subheader_secondary: {
    fontSize: 20,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_subheader2_secondary: {
    fontSize: 20,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_subheader_disabled: {
    fontSize: 20,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_subheader2_disabled: {
    fontSize: 20,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_subheader_accent: {
    fontSize: 20,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_subheader2_accent: {
    fontSize: 20,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },


  light_body: {
    fontSize: 15,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_body2: {
    fontSize: 15,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_body_secondary: {
    fontSize: 15,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_body2_secondary: {
    fontSize: 15,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_body_disabled: {
    fontSize: 15,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_body2_disabled: {
    fontSize: 15,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_body_accent: {
    fontSize: 15,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  light_body2_accent: {
    fontSize: 15,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_body: {
    fontSize: 15,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_body2: {
    fontSize: 15,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_body_secondary: {
    fontSize: 15,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_body2_secondary: {
    fontSize: 15,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_body_disabled: {
    fontSize: 15,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_body2_disabled: {
    fontSize: 15,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_body_accent: {
    fontSize: 15,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_body2_accent: {
    fontSize: 15,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },


  light_caption: {
    fontSize: 10,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_caption2: {
    fontSize: 10,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_caption_secondary: {
    fontSize: 10,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_caption2_secondary: {
    fontSize: 10,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_caption_disabled: {
    fontSize: 10,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_caption2_disabled: {
    fontSize: 10,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_caption_accent: {
    fontSize: 10,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  light_caption2_accent: {
    fontSize: 10,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_caption: {
    fontSize: 10,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_caption2: {
    fontSize: 10,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_caption_secondary: {
    fontSize: 10,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_caption2_secondary: {
    fontSize: 10,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_caption_disabled: {
    fontSize: 10,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_caption2_disabled: {
    fontSize: 10,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_caption_accent: {
    fontSize: 10,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_caption2_accent: {
    fontSize: 10,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },


  light_small: {
    fontSize: 8,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_small2: {
    fontSize: 8,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
  },
  light_small_secondary: {
    fontSize: 8,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_small2_secondary: {
    fontSize: 8,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.5)',
    backgroundColor: 'transparent',
  },
  light_small_disabled: {
    fontSize: 8,

    fontFamily: 'Nunito-Light',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_small2_disabled: {
    fontSize: 8,

    fontFamily: 'Nunito-Black',
    color: 'rgba(37,50,55,0.2)',
    backgroundColor: 'transparent',
  },
  light_small_accent: {
    fontSize: 8,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  light_small2_accent: {
    fontSize: 8,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_small: {
    fontSize: 8,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_small2: {
    fontSize: 8,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
  },
  dark_small_secondary: {
    fontSize: 8,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_small2_secondary: {
    fontSize: 8,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  dark_small_disabled: {
    fontSize: 8,

    fontFamily: 'Nunito-Light',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_small2_disabled: {
    fontSize: 8,

    fontFamily: 'Nunito-Black',
    color: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dark_small_accent: {
    fontSize: 8,

    fontFamily: 'Nunito-Light',
    color: GLOBAL.COLOR.BRAND,
    backgroundColor: 'transparent',
  },
  dark_small2_accent: {
    fontSize: 8,

    fontFamily: 'Nunito-Black',
    color: GLOBAL.COLOR.BRAND,
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
