import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://www.aber.ac.uk/staff-profile-assets/img/noimg.png';

/*
 * Author: Tianyi Zhang and Elton C. Rego
 * Purpose: Styles the menu navigation elements
 */
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor:  GLOBAL.COLOR.GRAY,
    padding: 20,
  },
  menu_title: {
    color: GLOBAL.COLOR.DARKBLUE,
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: 40,
  },
  item: {
    fontSize: 22,
    fontWeight: '500',
    paddingTop: 20,
    color: GLOBAL.COLOR.DARKBLUE,
    fontFamily: 'Nunito'
  },
});

/*
 * Author: Tianyi Zhang and Elton C. Rego
 * Purpose: Returns the menu navigation elements
 */
export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <Text style = {styles.menu_title}>Menu</Text>
      <Text
        onPress={() => onItemSelected('home')}
        style={styles.item}
      >
        home
      </Text>

      <Text
        onPress={() => onItemSelected(' my_maintenance')}
        style={styles.item}
      >
        my maintenance
      </Text>

      <Text
        onPress={() => onItemSelected('nearby')}
        style={styles.item}
      >
        nearby
      </Text>

      <Text
        onPress={() => onItemSelected('about_my_car')}
        style={styles.item}
      >
        about my car
      </Text>

      <Text
        onPress={() => onItemSelected('car_management')}
        style={styles.item}
      >
        car management
      </Text>

      <Text
        onPress={() => onItemSelected(' settings')}
        style={styles.item}
      >
        settings
      </Text>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};