/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import DyView12 from './components/DyView12.js'
import Box_sample from './components/Box_sample.js'
import Text13 from './components/Text13.js'
import ProductList from './components/ProductList.js'


//AppRegistry.registerComponent(appName, () => DyView12);
//AppRegistry.registerComponent(appName, () => Text13);
AppRegistry.registerComponent(appName, () => ProductList);

