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

export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <Text style = {styles.menu_title}>Menu</Text>
      <Text
        onPress={() => onItemSelected('Home')}
        style={styles.item}
      >
        home
      </Text>

      <Text
        onPress={() => onItemSelected(' My_maintenance')}
        style={styles.item}
      >
        my maintenance
      </Text>

      <Text
        onPress={() => onItemSelected('Nearby')}
        style={styles.item}
      >
        nearby
      </Text>

      <Text
        onPress={() => onItemSelected('About_my_car')}
        style={styles.item}
      >
        about my car
      </Text>

      <Text
        onPress={() => onItemSelected('Car_management')}
        style={styles.item}
      >
        car management
      </Text>

      <Text
        onPress={() => onItemSelected(' Settings')}
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