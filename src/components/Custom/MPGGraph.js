/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Animated,
  // adding ART for the graph, probably will remove
  // other imports later 
  ART,
} from 'react-native';

const {
  Group,
  Shape,
  Surface,
} = ART;

/*
* Class: MPGGraph 
* Author: Will Coates 
* Purpose: Displays the gas data for a user's car in a graph of MPG over time.
*
* Props:
* NOT SURE WHAT SHOULD GO HERE YET
*/
export default class MPGGraph extends Component {

  /*
  * Method: Constructor()
  * Author: Elton C. Rego
  * Purpose: Sets up the component for use
  *   - sets renderSeparator to it's own name
  *   - sets delete to it's own name
  *   - sets setScrollEnabled to it's own name
  *   - sets state variables
  *       > enable : whether or not the scrolling is enabled
  *       > data : the list data passed in as a prop
  *
  * @param props - the props passed in from the parent component
  */
  constructor(props) {
    super(props);
    // keeping setScrollEnabled, but will likely change implementation
    // of scrolling
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: this.props.enable,
    };
  }


  /*
  * I'M KEEPING THIS AROUND BECAUSE WE'LL WANT TO SCROLL
  * THE GRAPH AT SOME POINT
  * function: setScrollEnabled()
  * Author: Elton C. Rego
  * Purpose: toggles the availability of the scroll function of this list
  *
  * @param: enable: a boolean value for the toggle
  */
  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }

/*
 *
 * render()
 * Renders the graph for display.
 * For now just copied from https://hswolff.com/blog/react-native-art-and-d3/
 *
 */
  render() {
    return (
      <Surface width={200} height={100}>
        <Group x={0} y={0}>
          <Shape
            d={this.props.linePath}
            stroke="#000"
            strokeWidth={1}
          />
        </Group>
      </Surface> 
    );
  }
}

const styles = StyleSheet.create({
});
