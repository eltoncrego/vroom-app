/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

// This thing
var polyline = require('@mapbox/polyline');

// Components
import {
  SafeAreaView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
  Animated,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
  getCurCar,
  pushFillup,
  removeFillup,
  pullFillups,
  updateMPG,
  pullAverageMPG,
  updateODO,
  pullODOReading,
  pullUserPermissions,
  pullOGODOReading,
} from '../Database/Database.js';

// Our Components
import Auth from '../Authentication/Auth';
import {InputField} from './../Custom/InputField'
import {Button} from './../Custom/Button';
import VroomAlert from './../Custom/VroomAlert';
import { goTo, clearNavStack, goBack } from '../Navigation/Navigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

/*
 * Class: Map
 * Author: Payam Katoozian
 *
 * Purpose: Shows a map, for now.
 *
 */

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class MapScreen extends Component {

  /*
   * Method: Constructor
   * Author: Payam Katoozian
   *
   * Purpose: Constructs the class with given props
   *
   * @param: properties
   */
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            concat: null,
            x: 'false',
            coords: [],
            destLatitude:36.961828,
            destLongitude:-122.055607,
            distance: 0,
            destination: null,
            mapActive: false,
        };
        this.mergeLot = this.mergeLot.bind(this);
    }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log("Position is:");
         console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }

   mergeLot(){
    if (this.state.latitude != null && this.state.longitude != null
        && this.state.destLatitude != null && this.state.destLatitude != null) {
      let concated = this.state.latitude + "," + this.state.longitude;
      let dest = this.state.destLatitude + "," + this.state.destLongitude;
      this.setState({
        concat: concated,
      }, () => {
        this.getDirections(concated, dest);
      });
    }
   }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`);
      let respJson = await resp.json();
      let points = polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      });
      this.setState({coords: coords});
      this.setState({x: "true"});

      // console.log("Num legs is: " + respJson.routes[0].legs.length);
      let meters = respJson.routes[0].legs[0].distance.value;
      console.log("Distance: " + meters + " meters");
      this.setState({distance: meters});

      return coords;
    } catch (error) {
      console.log(error);
      this.setState({x: "error"});
      return error;
    }
  }

   render() {

    return(
      <View style={styleguide.container}>
        <View style={styles.navbar}>
          <Text style={styleguide.dark_title2}>
            map<Text style={styleguide.dark_title2_accent}>.</Text>
          </Text>
            <TouchableOpacity onPress={() => goBack(this.props.navigation)}>
              <View>
                 <Text style={styleguide.dark_title}>
                   <FontAwesome>{Icons.times}</FontAwesome>
                 </Text>
               </View>
           </TouchableOpacity>
        </View>

      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='Enter your destination!'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details);
            this.setState(
              {
                mapActive: true,
              }
            );
          }}
          getDefaultValue={() => ''}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyDvgd7_O8DAkGWvS_A0Ble9H7KQdz9sckc',
            language: 'en', // language of the results
            types: '(cities)' // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: '100%'
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          predefinedPlaces={[homePlace, workPlace]}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
         {this.state.mapActive ?
          <MapView
            provider={ PROVIDER_GOOGLE }
            initialRegion={{ 
                latitude: 37.052155,
                longitude: -122.013957,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>

            {!!this.state.latitude && !!this.state.longitude && 
                <MapView.Marker
                    coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                    title={"Your Location"}
                />
            }     

            {!!this.state.destLatitude && !!this.state.destLongitude && <MapView.Marker
              coordinate={{"latitude":this.state.destLatitude,"longitude":this.state.destLongitude}}
              title={"Your Destination"}
            />}

            {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
                coordinates={this.state.coords}
                strokeWidth={5}
                strokeColor="blue"/>
            }

            {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
              coordinates={[
                  {latitude: this.state.latitude, longitude: this.state.longitude},
                  {latitude: this.state.destLatitude, longitude: this.state.destLongitude},
              ]}
              strokeWidth={5}
              strokeColor="blue"/>
             }
          </MapView> : null}
        </View>
    </View>
    );
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    navbar: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 24,
      paddingTop: 32,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: 'rgba(255,255,255,0.50)',
      backgroundColor: GLOBAL.COLOR.DARKBLUE,
    },
});

























