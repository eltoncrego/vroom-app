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

import { Line } from 'react-native-svg'

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

// For formatting dates
import { format, setHours } from 'date-fns';

const {
  Group,
  Shape,
  Surface,
} = ART;


// import the graph functions
import * as graphUtils from './graph-utils';
// allow pulling average MPG (although I thought Database would take care of this)
import Auth from '../Authentication/Auth';

// set up padding around graph
const horizontalPadding = 40;
const verticalPadding = 10;

// tick width for axes
const TickWidth = 100 ;


const dimensionWindow = Dimensions.get('window');

// pull the average MPG for the average line
//const averageMPG = Auth.pullAverageMPG();

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
    width: Math.round(dimensionWindow.width * 1),
    height: Math.round(dimensionWindow.height * 0.3),
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

    const graphWidth = width - horizontalPadding * 2;
    const graphHeight = height - verticalPadding * 2;

    const lineGraph = graphUtils.createLineGraph({
      data,
      xAccessor,
      yAccessor,
      width: graphWidth,
      height: graphHeight,
    });

    this.setState({
      graphWidth,
      graphHeight,
      linePath: lineGraph.path,
      // adding axes
      ticks: lineGraph.ticks,
      scale: lineGraph.scale,
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
      // adding axes
      ticks,
      scale,
    } = this.state;

    // adding props and state for axes
    const {
      x: scaleX,
      y: scaleY,
    } = scale;
    const {
      yAccessor,
    } = this.props;

    const tickYFormat = scaleY.tickFormat(null, '.2f');

  /* SHOULD REALLY IMPORT THIS BUT I COPIED IT FOR NOW
  * Function: createDateObject()
  * Author: Elton C. Rego
  * Purpose: Returns a date objecy based on the given date json
  *   in an array format
  *
  * @param: date - a date object formatted in array scope
  */
function createDateObject(date){
        var year = date[0];
        var month = date[1];
        var day = date[2];
        var hours = date[3];
        var mins = date[4];
        var seconds = date[5];
        const returnValue = setHours(new Date(year, month, day), hours, mins, seconds);
        console.log(returnValue);
        return returnValue;
      }

    return (
      <View style={styles.container}>
        <Surface width={graphWidth} height={graphHeight}>
          <Group x={0} y={0}>
            <Shape
              d={linePath}
              stroke={GLOBAL.COLOR.GREEN}
              strokeWidth={1}
            />
          </Group>
        </Surface>
      {/* X Axis */}
        <View key={'ticksX'}>
          {ticks.map((tick, index) => {
          {/* Applies the same style and format across all X ticks */}
            // position and style the ticks
            const tickStyles = {};
            tickStyles.width = TickWidth;
            tickStyles.left = tick.x - (TickWidth / 2);
            // convert the date array for each tick to a Date object
            let tickDate = createDateObject(tick.datum.date);
            // convert to string in format: "Feb 12"
            let formattedTickDate = format(tickDate, 'MMM DD');

            return (
              <Text key={index} style={[styles.tickLabelX, tickStyles]}>
              {formattedTickDate}
              </Text>
            );
          })}
        </View>

        <View key={'ticksY'} style={styles.ticksYContainer}>
          {/* Applies the same style and format across all Y ticks */}
          {ticks.map((tick, index) => {
            // use the yAccessor function to extract the mpg from datum
            const value = yAccessor(tick.datum);
            // position and style the ticks
            const tickStyles = {};
            tickStyles.width = TickWidth;
            tickStyles.left = tick.x - Math.round(TickWidth * 0.5);
            tickStyles.top = tick.y + 2 - Math.round(TickWidth * 0.65) + 40;

            return (
              <View key={index} style={[styles.tickLabelY, tickStyles]}>
                <Text style={styles.tickLabelYText}>
                  {tickYFormat(value)} mpg
                </Text>
              </View>
            );
          })}
        </View>
      {/*Create a dot for each data point */}
        <View key={'ticksYDot'} style={styles.ticksYContainer}>
          {ticks.map((tick, index) => (
            <View
              key={index}
              style={[styles.ticksYDot, {
                left: tick.x,
                top: tick.y,
              }]}
            />
          ))}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 15,
    left: 15 + (horizontalPadding / 2),
  },
  
    tickLabelX: {
    position: 'absolute',
    bottom: -12,
    fontSize: 12,
    textAlign: 'center',
    color: GLOBAL.COLOR.WHITE,
  },

  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },

  tickLabelYText: {
    fontSize: 12,
    textAlign: 'center',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
    left: 15,
    //top: ,

  },
  // styling for the dots on the line graph
  ticksYDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: GLOBAL.COLOR.WHITE,
    borderRadius: 100,
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