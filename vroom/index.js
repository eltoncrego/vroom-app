/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Components
import { AppRegistry } from 'react-native';
import Auth from "./src/components/Login/Auth";

import r2Login from "./src/components/Login/r2Login"


/*
 * Method: AppRegistry.registerComponent
 * Author: Revi Team
 * Purpose: Pushes the authentication calss onto the view 
 *   Index.js is called before anything else in the application
 *   this file is the parent of the entire application
 */
AppRegistry.registerComponent('vroom', () => Auth);