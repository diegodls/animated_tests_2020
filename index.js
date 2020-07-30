/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Navigator from './src/navigation/Navigator'
import Teste from './src/components/Testes/TestesScreen'
AppRegistry.registerComponent(appName, () => Teste);
