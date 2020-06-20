import React from 'react';
import 'react-native-gesture-handler';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'react-native-elements';

/* authStack */
import SignIn from './src/pages/SignIn/SignIn';
import SignUp from './src/pages/SignUp/SignUp';
import LostPassword from './src/pages/Password/LostPassword';
import ChangePassword from './src/pages/Password/ChangePassword';

/* allStack */
import Profile from './src/pages/Profile/Profile';
import EditProfile from './src/pages/Profile/EditProfile';

/* userStack */
import Horario from './src/pages/ViewPassageiro/Horario/Horario';
import Reserva from './src/pages/ViewPassageiro/Reserva/Reserva';

/* adminStack */
import ListTrip from './src/pages/ViewAdmin/Trip/ListTrip';
import NewTrip from './src/pages/ViewAdmin/Trip/NewTrip';
import EditTrip from './src/pages/ViewAdmin/Trip/EditTrip';
import InfoTrip from './src/pages/ViewAdmin/Trip/InfoTrip';
import ListBus from './src/pages/ViewAdmin/Bus/ListBus';
import NewBus from './src/pages/ViewAdmin/Bus/NewBus';
import EditBus from './src/pages/ViewAdmin/Bus/EditBus';
import InfoBus from './src/pages/ViewAdmin/Bus/InfoBus';

console.disableYellowBox = true;

/*User Navigation */
const HorarioStack = createStackNavigator({
  Horario: {
    screen: Horario,
    navigationOptions: {
      title: 'Horários',
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  }
  },
});

const MainTabs = createBottomTabNavigator({
  Reserva: {
    screen: Reserva,
    navigationOptions: {
      headerShown: false,
      tabBarLabel: 'Reserva',
      tabBarIcon: ({tintColor, inactiveTintColor}) => (
      <Icon
        name="today"
        color={tintColor}
        inactiveTintColor={inactiveTintColor}
      />
      ),
    },
  },
  Horario: {
    screen: HorarioStack,
    navigationOptions: {
      tabBarLabel: 'Horários',
      tabBarIcon: ({tintColor, inactiveTintColor}) => (
      <Icon
        name="access-time"
        color={tintColor}
        inactiveTintColor={inactiveTintColor}
      />
      ),
    },
  },
  },
  { tabBarOptions: {
      inactiveTintColor: '#9a9ba5',
      activeTintColor: '#fff',
      style: {backgroundColor: '#283593'},
    },
  },
);

const MainStack = createStackNavigator({
  Home: {
    screen: MainTabs,
    navigationOptions: {headerShown: false},
  },
  Profile: {
    screen: Profile,
    navigationOptions: {headerShown: false},
  },
  EditProfile:{
    screen: EditProfile,
    navigationOptions: {
      title: 'Editar Perfil',
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
      },
    }
  }
  }, {initialRouteName: 'Home'},
);

/*admin Navigation */

const ViagemStack = createStackNavigator({
  Viagem: {
    screen: ListTrip,
    navigationOptions: {headerShown: false},
  }
});

const OnibusStack = createStackNavigator({
  Onibus: {
    screen: ListBus,
    navigationOptions: {headerShown: false},
  },
  NewBus: {
    screen: NewBus,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: 'Cadastrar Ônibus',
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  InfoBus:{
    screen: InfoBus,
    navigationOptions: {
      headerBackTitleVisible: false,
      title: 'Informações do Ônibus',
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  EditBus:{
    screen: EditBus,
    navigationOptions: {
      title: 'Editar Ônibus',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
});


const AdminStack2 = createStackNavigator ({
  ViagemStack: {
    screen: ViagemStack,
    navigationOptions: {headerShown: false},
  },
  OnibusStack: {
    screen: OnibusStack,
    navigationOptions: {headerShown: false}
  },
  Profile: {
    screen: Profile,
    navigationOptions: {headerShown: false},
  },
  EditProfile:{
    screen: EditProfile,
    navigationOptions: {
      title: 'Editar Perfil',
      headerStyle: {backgroundColor: '#283593'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }
  }
  },{initialRouteName: 'ViagemStack'},
);


/* colab Navigation*/
const colabStack2 = createStackNavigator ({
  ViagemStack: {
    screen: ViagemStack,
    navigationOptions: {headerShown: false},
  },
  Profile: {
    screen: Profile,
    navigationOptions: {headerShown: false},
  },
  EditProfile:{
    screen: EditProfile,
    navigationOptions: {
      title: 'Editar Perfil',
      headerStyle: { backgroundColor: '#283593'},
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold'},
    }
  }
  }, {initialRouteName: 'ViagemStack'}
);

/* entry Navigation */

const entradaStack = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {headerShown: false},
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerBackTitleVisible: false,
      title: 'Cadastrar',
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
  LostPassword:{
    screen: LostPassword,
    navigationOptions: {
      title: 'Esqueci minha senha',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
    }
  },
  ChangePassword:{
    screen: ChangePassword,
    navigationOptions: {
      title: 'Trocar minha senha',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
    }
  },
});

const MainApp = createSwitchNavigator(
  {
    app: MainStack,
    app2: AdminStack2,
    app3: colabStack2,
    auth: entradaStack,
  },
  {
    initialRouteName: 'auth',
  },
);
const AppNavigator = createAppContainer(MainApp);

export default function App ({navigation, router}) {
  return <AppNavigator />;
}
