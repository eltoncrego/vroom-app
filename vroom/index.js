/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Components
import { AppRegistry } from 'react-native';
import Auth from "./src/components/Login/Auth";

// Pushes the Authentication Class onto the View
AppRegistry.registerComponent('vroom', () => Auth);