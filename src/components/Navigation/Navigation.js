import React from 'react';
import { NavigationActions } from 'react-navigation'

/*
* Navigation function: clearNavStack
* Author: Alec Felt
*
* Purpose: clears current navigation Stack
           navigates to specified component (page)
*
* @param: (nav) = navigation prop for component
*         (page) = string specifiying name of component to go to
* @return: void
*
* https://reactnavigation.org/docs/navigators/navigation-actions
*/
export function clearNavStack(nav, page) {
  console.log("clearNavStack called");
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: page})
    ]
  });
  nav.dispatch(resetAction);
}

export function goBack(nav) {
  nav.dispatch(NavigationActions.back())
}

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
