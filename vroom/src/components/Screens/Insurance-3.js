/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

// Components
import {
	View,
	StyleSheet,
	Text,
	StatusBar,
	ScrollView,
	TouchableOpacity,
	SafeAreaView
} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {InputField} from './../Custom/InputField'


/*
 * Class: Loading
 * Author: Elton C.  Rego
 *
 * Purpose: A screen to be displayed while the app is loading
 */
export default class InsuranceThree extends Component {
	/*
	 * Method: constructor(props)
	 * Author: Elton C. Rego
	 */
	constructor(props) {
		super(props);
		this. state ={
			infoText: "Sit tight while we get you some quotes."
		}
	}

	updateText = () => {
		this.setState({infoText: "We'll shoot you a notification when we're done."})
	}

	componentDidMount() {
		console.log("Insurance-3: InsuranceThree component mounted");
	}

	/*
	 * Static: navigationOptions
	 * Author: Elton C. Rego, Alec Felt
	 *
	 * Purpose: To set the navigation bar options for this page
	 */
	static navigationOptions = ({navigation, screenProps}) => ({
		/*
		 * navigationOptions: headerStyle, headerRight
		 * Author: Elton C. Rego, Alec Felt
		 *
		 * Purpose: Add color/font to navbar
		 *          Add button on headerRight for navigation
		 *          options in the future
		 */
		header: null,
	});

	/*
	 * Method: render
	 * Author: Alec Felt (modified by Ryan Cho)
	 *
	 * Purpose: Renders the third insurance page.
	 *
	 */
	render() {
		return (
		    <SafeAreaView style={styles.screen_container}>
			     <StatusBar
			        barStyle="light-content"
			    />
  				<View style={styles.container}>
  			    <ScrollView showsVerticalScrollIndicator={"false"}>
              <View style={{paddingBottom: 32}}>
                <Text style={styleguide.dark_display2}>
      					  Insurance
      						<Text style={styleguide.dark_display2_accent}>.</Text>
    						</Text>
    						<Text style={styleguide.dark_headline_secondary} onPress ={this.updateText}>
                  {this.state.infoText}
                </Text>
              </View>
  						<View style={styles.company_item}>
                <View style={{marginRight: 8, opacity: 0.5,}}>
                  <Text style={[styles.icon, {color: GLOBAL.COLOR.WHITE}]}>
                    <FontAwesome>{Icons.checkSquareO}</FontAwesome>
                  </Text>
                </View>
						    <Text style={[styleguide.dark_title2_secondary]}>
                  Geico
                </Text>
  						</View>
              <View style={styles.company_item}>
                <View style={{marginRight: 8, opacity: 0.5,}}>
                  <Text style={[styles.icon, {color: GLOBAL.COLOR.WHITE}]}>
                    <FontAwesome>{Icons.checkSquareO}</FontAwesome>
                  </Text>
                </View>
						    <Text style={[styleguide.dark_title2_secondary]}>
                  AAA
                </Text>
  						</View>
              <View style={styles.company_item}>
                <View style={{marginRight: 8, opacity: 0.5,}}>
                  <Text style={[styles.icon, {color: GLOBAL.COLOR.WHITE}]}>
                    <FontAwesome>{Icons.checkSquareO}</FontAwesome>
                  </Text>
                </View>
						    <Text style={[styleguide.dark_title2_secondary]}>
                  Progressive
                </Text>
  						</View>
              <View style={styles.company_item}>
                <View style={{marginRight: 8, opacity: 0.5,}}>
                  <Text style={[styles.icon, {color: GLOBAL.COLOR.WHITE}]}>
                    <FontAwesome>{Icons.checkSquareO}</FontAwesome>
                  </Text>
                </View>
						    <Text style={[styleguide.dark_title2_secondary]}>
                  Esurance
                </Text>
  						</View>
              <View style={styles.company_item}>
                <View style={{marginRight: 8, opacity: 0.5,}}>
                  <Text style={[styles.icon, {color: GLOBAL.COLOR.WHITE}]}>
                    <FontAwesome>{Icons.checkSquareO}</FontAwesome>
                  </Text>
                </View>
						    <Text style={[styleguide.dark_title2_secondary]}>
                  USAA
                </Text>
  						</View>
              <View style={styles.company_item}>
                <View style={{marginRight: 8, opacity: 0.5,}}>
                  <Text style={[styles.icon, {color: GLOBAL.COLOR.WHITE}]}>
                    <FontAwesome>{Icons.checkSquareO}</FontAwesome>
                  </Text>
                </View>
						    <Text style={[styleguide.dark_title2_secondary]}>
                  Statefarm
                </Text>
  						</View>
            </ScrollView>
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
	/*
	 * Style: Button Header
	 * Author: Elton C. Rego
	 * Purpose: Add style to the navbar button
	 *               to stay consistent with project theme
	*/
	screen_container: {
		flex: 1,
		backgroundColor: GLOBAL.COLOR.RED,
		justifyContent: 'flex-start',
	},
	container:{
		flex: 1,
		padding: 32,
		alignItems: 'flex-start',
	},
	company_item: {
		marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
	},
	icon: {
    fontSize: 24,
  },
});
