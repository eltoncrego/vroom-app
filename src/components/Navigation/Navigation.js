import React from 'react';
import { NavigationActions } from 'react-navigation'

/*
* Navigation function: goTo
* Author: Alec Felt
*
* Purpose: navigate to the page component
*
* @param: (nav) = navigation prop for component
*         (page) = string specifiying name of component to go to
* @return: void
*/
export function goTo(nav, page) {
  console.log("goTo called")
  const { navigate } = nav;
  navigate(page);
}

/*
* Navigation function: goBack
* Author: Elton C. Rego
*
* Purpose: navigate to the previous page in the stack. Please use this
*   so that we dont have to reset the navigation stack all the time.
*
* @param: (nav) = navigation prop for component
* @return: void
*/
export function goBack(nav){
  nav.goBack();
}
