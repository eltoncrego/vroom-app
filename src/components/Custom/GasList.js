/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import GasListItem from './GasListItem';

/*
* Class: GasList
* Author: Elton C. Rego
* Purpose: renders a list of the gas fill-ups entered in by the user
*
* Props:
* enable, whether or not scrolling is enabled
* removeItem, takes a key as well and removes the item at that index
* average, the average MPG of this gaslist (used to render the correct ticker)
* data, the data array that needs to be passed into the flatlist items
* style, the style of the list specifically
*/
export default class GasList extends Component {

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
    this.renderSeparator = this.renderSeparator.bind(this);
    this.deleted = this.deleted.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: this.props.enable,
    };
  }

  /*
  * Function: renderSeparator()
  * Author: Elton C. Rego
  * Purpose: renders a separator for each item of the gaslist
  */
  renderSeparator() {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={[styles.separatorStyle, {backgroundColor: 'rgba(37,50,55,0.20)',}]} />
      </View>
    );
  }

  /*
  * Function: deleted()
  * Author: Elton C. Rego
  * Purpose: renders a separator for each item of the gaslist
  */
  deleted(key) {
    console.log("Removing value at key: " + key);
    this.props.removeItem(key);
  }

  /*
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
  * Function: renderItem()
  * Author: Elton C. Rego
  * Purpose: renders a specfic item from the list of fill-ups
  *
  * @param item: a element from the dataArray property
  */
  renderItem(item) {
    return (
      <GasListItem
        index={item.list_i}
        date={item.date}
        totalPrice={item.totalPrice}
        gallonsFilled={item.gallonsFilled}
        distanceSinceLast={item.distanceSinceLast}
        odometer={item.odometer}
        deleted={this.deleted}
        average={this.props.average}
        allowDeleteOn={this.props.data.length}
        setScrollEnabled={enable => this.setScrollEnabled(enable)}
      />
    );
  }

  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.props.data.reverse()}
        keyExtractor={(item) => item.list_i.toString()}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({item}) => this.renderItem(item)}
        scrollEnabled={this.state.enable}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 1,
  },
});
