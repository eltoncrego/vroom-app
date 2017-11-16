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
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: page})
    ]
  });
  nav.dispatch(resetAction);
}

/*
* Navigation function: goToNav
* Author: Elton C. Rego
*
* Purpose: Clears the current navigation stack
*   navigates to an item in the upper, drawer navigation
*/
export function goToDrawerNav(nav, page){
  nav.dispatch({
    type: 'Reset',
    index: 0,
    key: null, // Add this
    action: {
      type: 'Navigate',
      routeName: page,
    },
  })
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
  const { navigate } = nav;
  navigate(page);
}
