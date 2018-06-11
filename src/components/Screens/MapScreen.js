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
  Modal,
  TouchableHighlight
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
  getCurCar,
  pullAverageMPG,
} from '../Database/Database.js';

// Our Components
import Auth from '../Authentication/Auth';
import {InputField} from './../Custom/InputField'
import {Button} from './../Custom/Button';
import VroomAlert from './../Custom/VroomAlert';
import { pullFillups } from '../Database/Database.js';
import { goTo, clearNavStack, goBack } from '../Navigation/Navigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

/*
 * Class: Map
 * Author: Payam Katoozian
 *
 * Purpose: Shows a map, for now.
 *
 */

// const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

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
            destLatitude: 36.961828,
            destLongitude: -122.055607,
            distance: 0,
            destination: null,
            mapActive: false,
            fetched: 'false',
            modalVisible: false,
        };
        this.mergeLot = this.mergeLot.bind(this);
    }

  componentWillMount(){
    this.setMPG();
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
         //this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }

   // getFillupData() {
   //  let fillups = getFillupData();
   // }

   mergeLot(){
    if (this.state.latitude != null && this.state.longitude != null
        && this.state.destLatitude != null && this.state.destLatitude != null && this.state.fetched) {
      let concated = this.state.latitude + "," + this.state.longitude;
      let dest = this.state.destLatitude + "," + this.state.destLongitude;
      this.setState({
        concat: concated,
      }, () => {
        this.getDirections(concated, dest);
      });
    }
   }

  setMPG(){
    var that = this;
    getCurCar().then(function(){
      pullAverageMPG().then(function(fData){
        if(fData){
          that.setState({
            averageMPG: fData,
          });
          console.log(fData)
        }
      }).catch(function(error) {
        console.log('Failed to load average mpg data into state:', error);
      });
    });
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`);
      let respJson = await resp.json();
      this.setState({fetched: 'true'});
      let points = polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      });
      this.setState({coords: coords});
      this.setState({x: "true"});
      let meters = respJson.routes[0].legs[0].distance.value;
      let miles = meters * 0.000621371;
      let gallons_to_be_filled = miles / this.state.averageMPG;
      this.setState({distance: miles.toFixed(2), gallons_to_be_filled: gallons_to_be_filled.toFixed(2), modalVisible: true});
      return coords;

    } catch (error) {
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

      {this.state.mapActive ?
      <View style={styles.switcher}>
        <Button
          backgroundColor={GLOBAL.COLOR.BRAND}
          label={"Want to go somewhere else?"}
          width={"100%"}
          onPress={() => {
            this.setState({mapActive: false});
          }}
          title="Open location picker"
        />
      </View> : null }

      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='Enter your destination to plan a trip!'
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
                destLatitude: parseFloat(details.geometry.location.lat),
                destLongitude: parseFloat(details.geometry.location.lng),
              }
            );
            this.mergeLot();
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
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
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
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          debounce={200}
        />

         {this.state.mapActive ?
          <MapView
            style={styles.map}
            customMapStyle={[
 {
   "elementType": "geometry",
   "stylers": [
     {
       "color": "#f5f5f5"
     }
   ]
 },
 {
   "elementType": "labels",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "elementType": "labels.icon",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "elementType": "labels.text.fill",
   "stylers": [
     {
       "color": "#616161"
     }
   ]
 },
 {
   "elementType": "labels.text.stroke",
   "stylers": [
     {
       "color": "#f5f5f5"
     }
   ]
 },
 {
   "featureType": "administrative",
   "elementType": "geometry",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "administrative.land_parcel",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "administrative.land_parcel",
   "elementType": "labels.text.fill",
   "stylers": [
     {
       "color": "#bdbdbd"
     }
   ]
 },
 {
   "featureType": "administrative.neighborhood",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "poi",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "poi",
   "elementType": "geometry",
   "stylers": [
     {
       "color": "#eeeeee"
     }
   ]
 },
 {
   "featureType": "poi",
   "elementType": "labels.text.fill",
   "stylers": [
     {
       "color": "#757575"
     }
   ]
 },
 {
   "featureType": "poi.park",
   "elementType": "geometry",
   "stylers": [
     {
       "color": "#e5e5e5"
     }
   ]
 },
 {
   "featureType": "poi.park",
   "elementType": "labels.text.fill",
   "stylers": [
     {
       "color": "#9e9e9e"
     }
   ]
 },
 {
   "featureType": "road",
   "elementType": "geometry",
   "stylers": [
     {
       "color": "#ffffff"
     }
   ]
 },
 {
   "featureType": "road",
   "elementType": "labels.icon",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "road.arterial",
   "elementType": "labels",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "road.arterial",
   "elementType": "labels.text.fill",
   "stylers": [
     {
       "color": "#757575"
     }
   ]
 },
 {
   "featureType": "road.highway",
   "elementType": "geometry",
   "stylers": [
     {
       "color": "#dadada"
     }
   ]
 },
 {
   "featureType": "road.highway",
   "elementType": "labels",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "road.highway",
   "elementType": "labels.text.fill",
   "stylers": [
     {
       "color": "#616161"
     }
   ]
 },
 {
   "featureType": "road.local",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "road.local",
   "elementType": "labels.text.fill",
   "stylers": [
     {
       "color": "#9e9e9e"
     }
   ]
 },
 {
   "featureType": "transit",
   "stylers": [
     {
       "visibility": "off"
     }
   ]
 },
 {
   "featureType": "transit.line",
   "elementType": "geometry",
   "stylers": [
     {
       "color": "#e5e5e5"
     }
   ]
 },
 {
   "featureType": "transit.station",
   "elementType": "geometry",
   "stylers": [
     {
       "color": "#eeeeee"
     }
   ]
 },
 {
   "featureType": "water",
   "elementType": "geometry",
   "stylers": [
     {
       "color": "#c9c9c9"
     }
   ]
 },
 {
   "featureType": "water",
   "elementType": "labels.text.fill",
   "stylers": [
     {
       "color": "#9e9e9e"
     }
   ]
 }
]}
            provider={ PROVIDER_GOOGLE }
            initialRegion={{
                latitude: /*this.state.latitude == null ? 37.052155 : */this.state.latitude,
                longitude: /*this.state.longitude == null ? -122.013957 : */this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>

            {!!this.state.latitude && !!this.state.longitude &&
                <MapView.Marker
                    coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                    title={"Your Location"}
                    pinColor={GLOBAL.COLOR.BRAND}
                />
            }

            {!!this.state.destLatitude && !!this.state.destLongitude &&
              <MapView.Marker
                coordinate={{"latitude":this.state.destLatitude,"longitude":this.state.destLongitude}}
                title={"Your Destination"}
                pinColor={GLOBAL.COLOR.BRAND}
              />
            }

            {
              !!this.state.latitude && !!this.state.longitude && this.state.fetched && //this.state.x == 'true' &&
              <MapView.Polyline
                coordinates={this.state.coords}
                strokeWidth={5}
                strokeColor={GLOBAL.COLOR.DARKBLUE}
              />
            }
          </MapView>: null}

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)'}}>
              <View style={styles.modal_container}>
                <Text style={[styleguide.light_subheader,{textAlign: 'center'}]}>This trip is <Text style={styleguide.light_subheader2}>{this.state.distance} mi</Text> long.</Text>
                <Text style={[styleguide.light_subheader,{textAlign: 'center', marginTop: 16}]}>Based on your records, you will need <Text style={styleguide.light_subheader2}>{this.state.gallons_to_be_filled} gal</Text> of gas.</Text>
                <Text style={[styleguide.light_subheader,{textAlign: 'center', marginTop: 16}]}>If you drive, this trip will cost you <Text style={styleguide.light_subheader2}>${this.state.gallons_to_be_filled * 3.50}</Text>.</Text>
                <Button
                  backgroundColor={GLOBAL.COLOR.BRAND}
                  label={"View Route"}
                  width={"80%"}
                  height={64}
                  marginTop={16}
                  onPress={() => {
                    this.setState({modalVisible: false});
                  }}
                  title="View Map"
                />
              </View>
            </View>
          </Modal>

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

    modal_container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      backgroundColor: GLOBAL.COLOR.WHITE,
      paddingVertical: 32,
      paddingHorizontal: 32,
      borderRadius: 8,
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

    switcher: {
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 2,
      backgroundColor: 'rgba(0,0,0,0)',
    },

    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
  },
});
