import React from 'react';
import 'react-native-gesture-handler';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

/* authStack */
import SignIn from './src/pages/SignIn/SignIn';
import SignUp from './src/pages/SignUp/SignUp';
import LostPassword from './src/pages/Password/LostPassword';
import Reactivate from './src/pages/Password/Reactivate';

/* allStack */
import Profile from './src/pages/Profile/Profile';
import EditProfile from './src/pages/Profile/EditProfile';

/* userStack */
import Horario from './src/pages/ViewPassageiro/Horario/Horario';
import Reserva from './src/pages/ViewPassageiro/Reserva/Reserva';
import ConfirmReserva from './src/pages/ViewPassageiro/Reserva/ConfirmReserva';
import ListReserva from './src/pages/ViewPassageiro/Reserva/ListReserva';

/* adminStack */
import ListTrip from './src/pages/ViewAdmin/Trip/ListTrip';
import NewTrip from './src/pages/ViewAdmin/Trip/NewTrip';
import EditTrip from './src/pages/ViewAdmin/Trip/EditTrip';
import InfoTrip from './src/pages/ViewAdmin/Trip/InfoTrip';
import ListBus from './src/pages/ViewAdmin/Bus/ListBus';
import NewBus from './src/pages/ViewAdmin/Bus/NewBus';
import EditBus from './src/pages/ViewAdmin/Bus/EditBus';
import InfoBus from './src/pages/ViewAdmin/Bus/InfoBus';

/* colabStack */
import Instituicao from './src/pages/ViewColab/Instituicao/Instituicao';
import EditInstituicao from './src/pages/ViewColab/Instituicao/EditInst';
import ListColab from './src/pages/ViewColab/TripColab/ListColab';
import NewColab from './src/pages/ViewColab/TripColab/NewColab';
import EditColab from './src/pages/ViewColab/TripColab/EditColab';
import InfoColab from './src/pages/ViewColab/TripColab/InfoColab';

import {isSignedIn} from './src/services/auth';

console.disableYellowBox = true;

/*User Navigation */
const HorarioStack = createStackNavigator({
  Horario: {
    screen: Horario,
    navigationOptions: { headerShown: false}
  },
});

const ReservaStack = createStackNavigator({
  Reserva: {
    screen: Reserva,
    navigationOptions: { headerShown: false}
  },
  ConfirmReserva: {
    screen: ConfirmReserva,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: "Reserva",
      headerStyle: {
        backgroundColor: "#283593",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
})

const ListReservaStack = createStackNavigator({
  ListReserva: {
    screen: ListReserva,
    navigationOptions: { headerShown: false}
  },
  ConfirmReserva: {
    screen: ConfirmReserva,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: "Reserva",
      headerStyle: {
        backgroundColor: "#283593",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  }
})

const MainTabs = createBottomTabNavigator({
  Reserva: {
    screen: ReservaStack,
    navigationOptions: {
      headerShown: false,
      tabBarLabel: 'Reservar',
      tabBarIcon: ({tintColor, inactiveTintColor}) => (
      <Icon
        name="plus-circle-outline"
        size={24}
        color={tintColor}
        inactiveTintColor={inactiveTintColor}
      />
      ),
    },
  },
  Reservas: {
    screen: ListReservaStack,
    navigationOptions: {
      tabBarLabel: 'Reservas',
      tabBarIcon: ({tintColor, inactiveTintColor}) => (
      <Icon
        name="bus"
        size={24}
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
        name="clock-outline"
        size={24}
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
  },
  NewTrip: {
    screen: NewTrip,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: "Cadastrar Viagem",
      headerStyle: {
        backgroundColor: "#283593",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
  InfoTrip: {
    screen: InfoTrip,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: "Informações da Viagem",
      headerStyle: {
        backgroundColor: "#283593",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
  EditTrip: {
    screen: EditTrip,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: "Editar Viagem",
      headerStyle: {
        backgroundColor: "#283593",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
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

const AdminTabs = createBottomTabNavigator({
  Viagem: {
    screen: ViagemStack,
    navigationOptions: {
      headerShown: false,
      tabBarLabel: 'Viagem',
      tabBarIcon: ({tintColor, inactiveTintColor}) => (
      <Icon
        name="navigation"
        size={24}
        color={tintColor}
        inactiveTintColor={inactiveTintColor}
      />
      ),
    },
  },
  Onibus: {
    screen: OnibusStack,
    navigationOptions: {
      tabBarLabel: 'Ônibus',
      tabBarIcon: ({tintColor, inactiveTintColor}) => (
      <Icon
        name="bus"
        size={24}
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

const AdminStack2 = createStackNavigator ({
  Home: {
    screen: AdminTabs,
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
      headerStyle: {backgroundColor: '#283593'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }
  }
  },{initialRouteName: 'Home'},
);


/* colab Navigation*/
const ViagemColabStack = createStackNavigator({
  ViagemColab: {
    screen: ListColab,
    navigationOptions: {headerShown: false},
  },
  NewColab: {
    screen: NewColab,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: "Cadastrar Viagem",
      headerStyle: {
        backgroundColor: "#283593",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
  InfoColab: {
    screen: InfoColab,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: "Informações da Viagem",
      headerStyle: {
        backgroundColor: "#283593",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
  EditColab: {
    screen: EditColab,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: "Editar Viagem",
      headerStyle: {
        backgroundColor: "#283593",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
});

const ColabTabs = createBottomTabNavigator({
  ViagemColab: {
    screen: ViagemColabStack,
    navigationOptions: {
      headerShown: false,
      tabBarLabel: 'Viagem',
      tabBarIcon: ({tintColor, inactiveTintColor}) => (
      <Icon
        name="navigation"
        size={24}
        color={tintColor}
        inactiveTintColor={inactiveTintColor}
      />
      ),
    },
  },
  Inst: {
    screen: Instituicao,
    navigationOptions: {
      tabBarLabel: 'Instituição',
      tabBarIcon: ({tintColor, inactiveTintColor}) => (
      <Icon
        name="school"
        size={24}
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

const colabStack2 = createStackNavigator ({
  Home: {
    screen: ColabTabs,
    navigationOptions: {headerShown: false},
  },
  EditInstituicao: {
    screen: EditInstituicao,
    navigationOptions: {
      title: 'Editar Instituição',
      headerStyle: { backgroundColor: '#283593'},
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold'},
    }
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
  },{initialRouteName: 'Home'},
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
  Reactivate:{
    screen: Reactivate,
    navigationOptions: {
      title: 'Reativar conta',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
    }
  },
});

export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator(
    {
      app: MainStack,
      app2: AdminStack2,
      app3: colabStack2,
      auth: entradaStack,
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "app" : "auth",
      navigationOptions: {
        gesturesEnabled: false
      }
  });
};