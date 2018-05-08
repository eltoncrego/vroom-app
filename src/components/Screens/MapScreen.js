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

// Our Components
import Auth from '../Authentication/Auth';
import {InputField} from './../Custom/InputField'
import {Button} from './../Custom/Button';
import { goTo } from '../Navigation/Navigation';
import VroomAlert from './../Custom/VroomAlert';

/*
 * Class: Map
 * Author: Payam Katoozian
 *
 * Purpose: Shows a map, for now.
 *
 */
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
        //this.getDirections(concated, "36.961828,-122.055607");
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
      return coords;
    } catch (error) {
      console.log(error);
      this.setState({x: "error"});
      return error;
    }
  }

   render() {
    return(
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.container }
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



      </MapView>
    );
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 9,
        height:'100%',
        width: '100%',
    }
});


























