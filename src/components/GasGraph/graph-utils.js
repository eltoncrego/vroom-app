/*
 *
 * graph-utils.js
 * Several functions that use D3 to generate the graph,
 * including the path the line follows, the scales, and anything else
 * that should live in its own utils component.
 * 
 * AUTHOR: Will Coates
 * (Originally copied from Harry Wolff's WeatherGraph example: 
 *  https://github.com/hswolff/BetterWeather
 *  I have modified it to fit our needs. )
 *
 */

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

import dateFns from 'date-fns'
// necessary for animation
import { View, Animated, Dimensions } from 'react-native';
const d3 = {
  scale,
  shape,
};

// various magic numbers
const domainPadding = 10;
const dummyDate = new Date(2018, 0, 1);
  
/*
  * Function: createDateObject()
  * Author: Elton C. Rego
  * Purpose: Returns a date objecy based on the given date json
  *   in an array format
  *
  * @param: date - a date object formatted in array scope
  */
function  createDateObject(date){
    var year = date[0];
    var month = date[1];
    var day = date[2];
    var hours = date[3];
    var mins = date[4];
    var seconds = date[5];
    const returnValue = dateFns.setHours(new Date(year, month, day), hours, mins, seconds);
    console.log(returnValue);
    return returnValue;
  }
/**
 * Create an x-scale.
 * @param {number} start Start time in seconds.
 * @param {number} end End time in seconds.
 * @param {number} width Width to create the scale with.
 * @return {Function} D3 scale instance.
 */
function createScaleX(start, end, width) {
  return d3.scale.scaleTime()
    //.domain([new Date(start * 1000), new Date(end * 1000)])
    // make scale not hardcoded later!

    //.domain([new Date(2018, 0, 1), new Date(2018, 3, 1)])
    .domain([createDateObject(start), createDateObject(end)])
    .range([0, width]);
}

/**
 * Create a y-scale.
 * @param {number} minY Minimum y value to use in our domain.
 * @param {number} maxY Maximum y value to use in our domain.
 * @param {number} height Height for our scale's range.
 * @return {Function} D3 scale instance.
 */
function createScaleY(minY, maxY, height) {
  return d3.scale.scaleLinear()
    .domain([minY - domainPadding, maxY + domainPadding]).nice()
    // We invert our range so it outputs using the axis that React uses.
    .range([height, 0]);
}


export function animateLineGraph(linePath, duration){

  const animation = Animated.sequence([
            Animated.delay(5000),
           // Animated.parallel([
                Animated.timing(linePath.strokeDashoffset, {
                    toValue: 0,
                    duration: duration 
                })
                /*
                Animated.stagger(
                    staggerLength,
                    this.points.map(point =>
                        Animated.spring(point.r, {
                            toValue: radius,
                            speed
                        })
                    )
                )
                */
            //])
        ]);
        animation.start();  
}
/**
 * Creates a line graph SVG path that we can then use to render in our
 * React Native application with ART.
 * Author: Will Coates
 * @param {Array.<Object>} options.data Array of data we'll use to create
 *   our graphs from.
 * @param {function} xAccessor Function to access the x value from our data.
 * @param {function} yAccessor Function to access the y value from our data.
 * @param {number} width Width our graph will render to.
 * @param {number} height Height our graph will render to.
 * @return {Object} Object with data needed to render.
 */
export function createLineGraph({
  data,
  xAccessor,
  yAccessor,
  width,
  height,
}) {

  const lastDatum = data[data.length - 1];

  console.log("createLineGraph");
  console.log("data = " + data);
  console.log("lastDatum = " + lastDatum);

  /* the x scale should be based on date.
   createLineGraph is sometimes called before fillups are pulled, so have to null check
   and start with dummy values */
  let xScaleStart = dummyDate;
  let xScaleEnd = dummyDate;

  // if createLineGraph is being called after fillups are pulled, then set the
  // scale to the proper values  
  if(data[0] != null){
  	// counterintuitively, the date scale must be reversed
  	xScaleStart = lastDatum.date;
  	xScaleEnd = data[0].date;
  } 
 
  // actually create the scale 
  const scaleX = createScaleX(
  	xScaleStart,
  	xScaleEnd,
    width
  );

  // Collect all y values.
  
  const allYValues = data.reduce((all, datum) => {
    all.push(yAccessor(datum))
    return all;
  }, []);
  
  // Get the min and max y value.
  const extentY = d3Array.extent(allYValues);
  const scaleY = createScaleY(extentY[0], extentY[1], height);
  // create the line generator function, with x/y coordinates for each point
  const lineShape = d3.shape.line()
    .x((d) => scaleX(xAccessor(d)))
    .y((d) => scaleY(yAccessor(d)))
    // smooth out the curve
    .curve(d3.shape.curveMonotoneX);

   // fill in below the graph
   var fillArea = d3.shape.area()
   				.x((d) => scaleX(xAccessor(d)))
   				.y1((d) => scaleY(yAccessor(d)))
   				.y0(scaleY(0))
   				.curve(d3.shape.curveMonotoneX)
   				;


  return {
  	data,
  	scale: {
  		x: scaleX,
  		y: scaleY,
  	},

    path: lineShape(data),
    fillArea: fillArea(data),
    strokeDashoffset: new Animated.Value(width),
    strokeDasharray: [width, width],

    /* returning additional information for axes */
    ticks: data.map((datum) => {
    	const date = xAccessor(datum);
    	const value = yAccessor(datum);

    	return {
    		x: scaleX(date),
    		y: scaleY(value),
    		datum,
    	};
    }),
  };
}
