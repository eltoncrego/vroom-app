/*
 * 
 * MPGGraph.js: Component that contains the graph of MPG over time
 * 
 * AUTHOR: Will Coates
 * (Modified from Harry Wolff's WeatherGraph example: 
 *  https://github.com/hswolff/BetterWeather
 *  )
 *  
 */

// Global Requirements
import React, { Component, PropTypes } from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Animated,
  // adding ART and Dimensions for the graph, probably will remove
  // other imports later 
  Dimensions,
  ART,
} from 'react-native';

// Importing Database functions for graph
import {
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

const {
  Group,
  Shape,
  Surface,
} = ART;


// import the graph functions
import * as graphUtils from './graph-utils';
// Not sure if I need this, or if it's taken care of by 
// Globals, or if the color is even necessary
// import Color from '../services/color';

// set up padding around graph
const PaddingSize = 20;

const dimensionWindow = Dimensions.get('window');

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

  /* THIS MAY BE OBSELETE, OR IT MAY BE WHAT I NEED TO DO
     INSTEAD OF THE COPY+PASTING */
     /*
  constructor(props) {
    super(props);
    // keeping setScrollEnabled, but will likely change implementation
    // of scrolling
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: this.props.enable,
    };
  }
*/

  static propTypes = {
    /*
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xAccessor: PropTypes.func.isRequired,
    yAccessor: PropTypes.func.isRequired,
    */
  }

  static defaultProps = {
    width: Math.round(dimensionWindow.width * 0.9),
    height: Math.round(dimensionWindow.height * 0.5),
  };

  state = {
    graphWidth: 0,
    graphHeight: 0,
    linePath: '',
  };

  componentWillMount() {
    this.computeNextState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.computeNextState(nextProps);
  }

  computeNextState(nextProps) {
    const {
      data,
      width,
      height,
      xAccessor,
      yAccessor,
    } = nextProps;

    const graphWidth = width - PaddingSize * 2;
    const graphHeight = height - PaddingSize * 2;

    const lineGraph = graphUtils.createLineGraph({
      data: [28, 36, 7],
      xAccessor,
      yAccessor,
      width: graphWidth,
      height: graphHeight,
    });

    this.setState({
      graphWidth,
      graphHeight,
      linePath: lineGraph.path,
    });
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

  render() {
    const {
      graphWidth,
      graphHeight,
      linePath,
    } = this.state;

    return (
      <View style={styles.container}>
        <Surface width={graphWidth} height={graphHeight}>
          <Group x={0} y={0}>
            <Shape
              d={linePath}
              stroke={Color.Orange}
              strokeWidth={1}
            />
          </Group>
        </Surface>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});
/*
 *
 * render()
 * Renders the graph for display.
 * For now just copied from https://hswolff.com/blog/react-native-art-and-d3/
 *
 */
 /*
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
*/