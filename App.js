import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createRootNavigator} from './routes';
import {isSignedIn} from './src/services/auth';

console.disableYellowBox = true;

export default function App () {
  
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    isSignedIn()
      .then(res => 
        setSigned(res),
        )
      .catch(err => Alert.alert("Erro"));
  },[]);

  const App = createRootNavigator(signed);

  const AppNavigator = createAppContainer(App);

  return <AppNavigator />;
}


