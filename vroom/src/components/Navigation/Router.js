/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');

// Components
import {
  StackNavigator,
  DrawerNavigator,
  SafeAreaView,
  DrawerItems,
} from "react-navigation";
import {
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";

// Necessary Files
import Login from '../Login/Login';
import Onboarding from '../Screens/Onboarding';
import Dashboard from '../Screens/Dashboard';
import Settings from '../Screens/Settings';
import Tasks from '../Screens/Tasks';

/*
 * Constant: DrawerContent
 * Author: Elton C. Rego
 *
 * Purpose: Creates a custom drawer DOM which can be styled according
 *   to our design guidelines
 */
const DrawerContent = (props) => (
  <ScrollView scrollsToTop={false} style={drawer_styles.menu}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <Text style={drawer_styles.menu_title}>Menu</Text>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

/*
 * Class: Hidden
 * Author: Elton C. Rego
 * Purpose: Return when you want to have a drawer item be hidden
 */
export class Hidden extends Component {
  render() {
    return null;
  }
}


/*
 * Constant: SignedOut
 * Author: Elton C. Rego
 *
 * Purpose: Impliments a Stack Navigator that holds the screen
 *   for when a user is logged out.
 */
export const SignedOut = StackNavigator ({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      header: null,
    },
  },
});

/*
 * Constant: DashboardScreen
 * Author: Elton C. Rego
 * Purpose: Handles the stack navigator component for the dashboard
 *   allows us to have a nav bar with the drawer navigator
 */
export const DashboardScreen = StackNavigator({
  Dashboard: {screen: Dashboard},
});

/*
 * Constant: OnboardingScreen
 * Author: Elton C. Rego
 * Purpose: Handles the stack navigator component for the onboarding
 *   allows us to have a nav bar with the drawer navigator
 */
export const OnboardingScreen = StackNavigator({
  Onboarding: {screen: Onboarding},
});

/*
 * Constant: SettingsScreen
 * Author: Elton C. Rego
 * Purpose: Handles the stack navigator component for the settings
 *   allows us to have a nav bar with the drawer navigator
 */
export const SettingsScreen = StackNavigator({
  Settings: {screen: Settings},
});

/*
 * Constant: TasksScreen
 * Author: Elton C. Rego
 * Purpose: Handles the stack navigator component for the tasks 
 *   allows us to have a nav bar with the drawer navigator
 */
export const TasksScreen = StackNavigator({
  Tasks: {screen: Tasks},
});

/*
 * Constant: SignedUp
 * Author: Elton C. Rego
 *
 * Purpose: Handles the drawer navigator component within the
 *   Drawer navigator. Allows us to maintain our custom navigation
 *   bar with an overlayed drawer navigation. Place screens that
 *   should not have a drawer menu here.
 */
export const SignedUp = DrawerNavigator({
  Onboarding: {
    screen: OnboardingScreen,
    navigationOptions: {
      drawerLabel: <Hidden/>
    },
  },
  Dashboard: {screen: DashboardScreen},
  Tasks: {screen: TasksScreen},
  Settings: {screen: SettingsScreen},
},{
  contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: GLOBAL.COLOR.GREEN,
      inactiveTintColor: GLOBAL.COLOR.BLUE,
      labelStyle:{
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'Nunito',
        paddingLeft: 5,
      },
      itemsContainerStyle: {
        marginVertical: 0,
      },
    },
});

/*
 * Constant: SignedIn
 * Author: Elton C. Rego
 *
 * Purpose: Handles the drawer navigator component within the
 *   Drawer navigator. Allows us to maintain our custom navigation
 *   bar with an overlayed drawer navigation. Place screens that
 *   should not have a drawer menu here.
 */
export const SignedIn = DrawerNavigator({
  Dashboard: {screen: DashboardScreen},
  Onboarding: {
    screen: OnboardingScreen,
    navigationOptions: {
      drawerLabel: <Hidden/>
    },
  },
  
  Tasks: {screen: TasksScreen},
  Settings: {screen: SettingsScreen},
},{
  contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: GLOBAL.COLOR.GREEN,
      inactiveTintColor: GLOBAL.COLOR.BLUE,
      labelStyle:{
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'Nunito',
        paddingLeft: 5,
      },
      itemsContainerStyle: {
        marginVertical: 0,
      },
    },
});

// export const createMainApplication = (signedIn, onboarding) => {
//   if(onboarding){
//     return StackNavigator({
//       SignedIn: {
//         screen: SignedIn,
//         navigationOptions: {
//           gesturesEnabled: false
//         }
//       },
//       SignedUp: {
//         screen: SignedIn,
//         navigationOptions: {
//           gesturesEnabled: false
//         }
//       },
//         SignedOut: {
//           screen: SignedOut,
//           navigationOptions: {
//             gesturesEnabled: false
//           }
//         }
//     },{
//       headerMode: "none",
//       mode: "modal",
//       initialRouteName: signedIn ? "SignedUp" : "SignedOut",
//     });
//   } else {
//     return StackNavigator({
//       SignedIn: {
//         screen: SignedIn,
//         navigationOptions: {
//           gesturesEnabled: false
//         }
//       },
//       SignedUp: {
//         screen: SignedIn,
//         navigationOptions: {
//           gesturesEnabled: false
//         }
//       },
//         SignedOut: {
//           screen: SignedOut,
//           navigationOptions: {
//             gesturesEnabled: false
//           }
//         }
//     },{
//       headerMode: "none",
//       mode: "modal",
//       initialRouteName: signedIn ? "SignedIn" : "SignedOut",
//     });
//   }
// };

/*
 * Constant: Styles
 * Author: Elton C. Rego
 *
 * Purpose: Styles the drawer navigation menu
 */
const drawer_styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor:  GLOBAL.COLOR.GRAY,
  },
  menu_title: {
    color: GLOBAL.COLOR.DARKBLUE,
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: 40,
    padding: 20,
  },
});
