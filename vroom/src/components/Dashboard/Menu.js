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
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 22,
    fontWeight: '300',
    paddingTop: 20,
    color: GLOBAL.COLOR.DARKBLUE,
    fontFamily: 'Helvetica'
  },
});

export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri }}
        />
        <Text style={styles.name}>Profile name</Text>
      </View>

      <Text
        onPress={() => onItemSelected('Home')}
        style={styles.item}
      >
        Home
      </Text>

      <Text
        onPress={() => onItemSelected(' My_maintenance')}
        style={styles.item}
      >
        My maintenance
      </Text>

      <Text
        onPress={() => onItemSelected('Nearby')}
        style={styles.item}
      >
        Nearby
      </Text>

      <Text
        onPress={() => onItemSelected('About_my_car')}
        style={styles.item}
      >
        About my car
      </Text>

      <Text
        onPress={() => onItemSelected('Car_management')}
        style={styles.item}
      >
        Car management
      </Text>

      <Text
        onPress={() => onItemSelected(' Settings')}
        style={styles.item}
      >
        Settings
      </Text>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};