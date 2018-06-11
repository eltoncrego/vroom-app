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
  ScrollView,
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

// For formatting dates
import { format, setHours, differenceInCalendarDays, isDate} from 'date-fns';

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
const TickWidth = 100;

const dimensionWindow = Dimensions.get('window');

// animation variables
const strokeDashoffsetDuration = 2000;


/*
* Class: MPGGraph
* Author: Will Coates
* Purpose: Displays the gas data for a user's car in a graph of MPG over time.
*
* Props:
* NOT SURE WHAT SHOULD GO HERE YET
*/
export default class MPGGraph extends Component {

  static defaultProps = {
    width: Math.round(dimensionWindow.width * 1),
    height: Math.round(dimensionWindow.height * 0.3),
  };

  state = {
    graphWidth: 0,
    graphHeight: 0,
    linePath: '',
    fillArea: '',
  };

  /* SHOULD REALLY IMPORT THIS BUT I COPIED IT FOR NOW
  * Function: createDateObject()
  * Author: Elton C. Rego
  * Purpose: Returns a date objecy based on the given date json
  *   in an array format
  *
  * @param: date - a date object formatted in array scope
  */
createDateObject(date){
        var year = date[0];
        var month = date[1];
        var day = date[2];
        var hours = date[3];
        var mins = date[4];
        var seconds = date[5];
        const returnValue = setHours(new Date(year, month, day), hours, mins, seconds);
        return returnValue;
      }

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

    /*
     *
     * NOTE: The width of the graph should vary based on the range
     * between the first and the last fillup. This works, except when
     * adding a new fillup. Everything except the two paths (path and fillArea)
     * figures out the new width correctly. However, the paths get "stretched"
     * to a width much beyond the actual new width...until you reload the app.
     * Then everything's fine. Console logging the width at several different points in
     * the code did not provide any clues, the width and even the paths are calculated
     * correctly. They're just being displayed wrong.
     *
     * To circumvent these issues (yuck), the graph width remains constant. This makes the line
     * draw properly for some reason, but will become an issue after enough time (a year?) of fillups,
     * because the graph will get "squished", with points too close to each other.
     *
     */
/*
    var range = 0;
    if(data[0] != null){
      let lastDate = this.createDateObject(data[0].date);
      let firstDate = this.createDateObject(data[data.length - 1].date);
      range = differenceInCalendarDays(lastDate, firstDate);

      console.log(range);
    }
    console.log("old width: " + width);
    const graphWidth = (range * 7);
*/
    const graphWidth = 900;
    const graphHeight = height - verticalPadding * 2;
    const lineGraph = graphUtils.createLineGraph({
      data,
      xAccessor,
      yAccessor,
      width: graphWidth,
      height: graphHeight,
    });

    this.setState({
      graphWidth: graphWidth,
      graphHeight,
      linePath: lineGraph.path,
      // adding fill
      fillArea: lineGraph.fillArea,
      // adding axes
      ticks: lineGraph.ticks,
      scale: lineGraph.scale,
    });
  }

  render() {
    const {
      graphWidth,
      graphHeight,
      linePath,
      area,
      fillArea,
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
        return returnValue;
      }
    return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
      >
      <View style={styles.container}>
        <Surface width={graphWidth} height={graphHeight}>
          <Group x={0} y={0}>
            <Shape
              d={linePath}
              stroke={GLOBAL.COLOR.BRAND}
              strokeWidth={3}
            />
            <Shape
              d={fillArea}
              fill={GLOBAL.COLOR.GREEN}
              opacity={0.2}
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
            let tickDate = this.createDateObject(tick.datum.date);
            // convert to string in format: "Feb 12"
            let formattedTickDate = format(tickDate, 'MMM DD');

            return (
              <Text key={index} style={[styles.tickLabelX, tickStyles]}>
              {formattedTickDate}
              </Text>
            );
          })}
        </View>

      {/* The mpg labels for each point */}
        <View key={'ticksY'} style={styles.ticksYContainer}>
          {/* Applies the same style and format across all Y ticks */}
          {ticks.map((tick, index) => {
            // use the yAccessor function to extract the mpg from datum
            const value = yAccessor(tick.datum);
            // position and style the ticks
            const tickStyles = {};
            tickStyles.width = TickWidth;
            tickStyles.left = tick.x - Math.round(TickWidth * 0.5);
            tickStyles.top = tick.y + 40 - Math.round(TickWidth * 0.65);

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
                top: tick.y - 3.2,
              }]}
            />
          ))}
        </View>
    </View>
  </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  area:{
    // if styling does nothing in the stylesheet, do styling in
    // the component itself
  },

  container: {
    top: 0,
    left: (horizontalPadding / 2),
    right: (horizontalPadding / 2),
  },

  scrollView: {
    paddingRight: 50,
  },

    tickLabelX: {
    position: 'absolute',
    bottom: -15,
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
    backgroundColor: 'transparent',
  },

  tickLabelYText: {
    fontSize: 12,
    textAlign: 'center',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
    left: 15,

  },
  // styling for the dots on the line graph
  ticksYDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    backgroundColor: GLOBAL.COLOR.WHITE,
    borderRadius: 100,
    borderRadius: 100,
  },
});
