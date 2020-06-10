import React from 'react';
import 'react-native-gesture-handler';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'react-native-elements';

import {
  Menu,
  Horario,
  HorarioDetalhes,
  Perfil,
  EditarDados,
  EditarEndereco,
  EditarSenha,
  VerificarReserva,
  SignIn,
  SignUp,
  EsqueciSenha,
  MudarSenha,
  Reserva,
  MenuAdmin,
  ListBus,
  EditBus,
  NewBus,
  InfoBus,
  InfoTrip,
  ListTrip,
  EditTrip,
  NewTrip,
  MenuColab,
  
} from './src/pages';

console.disableYellowBox = true;

/*Navegação do Passageiro */
const FeedStack = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: {headerShown: false},
  },
});

const HorarioStack = createStackNavigator({
  Horario: {
    screen: Horario,
    navigationOptions: {headerShown: false},
  },
  HorarioDetail: {
    screen: HorarioDetalhes,
    navigationOptions: {
      headerBackTitleVisible: false,
      title: 'Detalhes de Horário',
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

const MainTabs = createBottomTabNavigator(
  {
    Menu: {
      screen: FeedStack,
      navigationOptions: {
        tabBarLabel: 'Menu',
        tabBarIcon: ({tintColor, inactiveTintColor}) => (
          <Icon
            name="home"
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
    Reserva: {
      screen: Reserva,
      navigationOptions: {
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
  },
  {
    tabBarOptions: {
      inactiveTintColor: '#9a9ba5',
      activeTintColor: '#fff',
      style: {backgroundColor: '#283593'},
    },
  },
);

const MainStack = createStackNavigator(
  {
    Home: {
      screen: MainTabs,
      navigationOptions: {headerShown: false},

    },
    VerificaReserva: {
      screen: VerificarReserva,
      navigationOptions: {
        headerBackTitleVisible: false,
        title: 'Verificar Reserva',
        headerStyle: {
          backgroundColor: '#283593',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    }
    },
    Perfil: {
      screen: Perfil,
      navigationOptions: {headerShown: false},
    },
    EditarDados: {
      screen: EditarDados,
      navigationOptions: {
        title: 'Editar Perfil',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#283593',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    EditarEndereco: {
      screen: EditarEndereco,
      navigationOptions: {
        title: 'Editar Perfil',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#283593',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    EditarSenha: {
      screen: EditarSenha,
      navigationOptions: {
        title: 'Editar Senha',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#283593',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    
  },
  {initialRouteName: 'Home'},
);

/*Navegação do Administrador */
const adminStack = createStackNavigator ({
  MenuAdmin: {
    screen: MenuAdmin,
    navigationOptions: {headerShown: false},
  }
})

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
      title: 'Cadastrar Viagem',
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  InfoTrip: {
    screen: InfoTrip,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: 'Informações da Viagem',
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  EditTrip: {
    screen: EditTrip,
    navigationOptions: {
      headerBackTitleVisible: false,
      tabBarVisible: false,
      title: 'Editar Viagem',
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

const OnibusStack = createStackNavigator({
  Onibus: {
    screen: ListBus,
    navigationOptions: {headerShown: false},
  },
  InfoBus: {
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
  EditOnibus: {
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
  },
  CadastrarOnibus: {
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
});

const AdminTabs = createBottomTabNavigator(
  {
    Menu: {
      screen: adminStack,
      navigationOptions: {
        tabBarLabel: 'Menu',
        tabBarIcon: ({tintColor, inactiveTintColor}) => (
          <Icon
            name="home"
            color={tintColor}
            inactiveTintColor={inactiveTintColor}
          />
        ),
      },
    },
    Viagem: {
      screen: ViagemStack,
      navigationOptions: {
        tabBarLabel: 'Viagem',
        tabBarIcon: ({tintColor, inactiveTintColor}) => (
          <Icon
            name="navigation"
            color={tintColor}
            inactiveTintColor={inactiveTintColor}
          />
        ),
      },
    },
    ListarOnibus: {
      screen: OnibusStack,
      navigationOptions: {
        tabBarLabel: 'Ônibus',
        tabBarIcon: ({tintColor, inactiveTintColor}) => (
          <Icon
            name="directions-bus"
            color={tintColor}
            inactiveTintColor={inactiveTintColor}
          />
        ),
      },
    },
    
  },
  {
    tabBarOptions: {
      inactiveTintColor: '#9a9ba5',
      activeTintColor: '#fff',
      style: {backgroundColor: '#283593'},
    },
  },
);

const AdminStack2 = createStackNavigator (
  
    {
      Home: {
        screen: AdminTabs,
        navigationOptions: {headerShown: false},
  
      },
      VerificaReserva: {
        screen: VerificarReserva,
        navigationOptions: {
          headerBackTitleVisible: false,
          title: 'Verificar Reserva',
          headerStyle: {
            backgroundColor: '#283593',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      }
      },
      Perfil: {
        screen: Perfil,
        navigationOptions: {headerShown: false},
      },
      EditarDados: {
        screen: EditarDados,
        navigationOptions: {
          title: 'Editar Perfil',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#283593',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      },
      EditarEndereco: {
        screen: EditarEndereco,
        navigationOptions: {
          title: 'Editar Perfil',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#283593',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      },
      EditarSenha: {
        screen: EditarSenha,
        navigationOptions: {
          title: 'Editar Senha',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#283593',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      },
    },
    {initialRouteName: 'Home'},
);


/*Navegação do Colaborador */
const colabStack = createStackNavigator ({
  MenuColab: {
    screen: MenuColab,
    navigationOptions: {headerShown: false},
  }
})

const colabTabs = createBottomTabNavigator(
  {
    Menu: {
      screen: colabStack,
      navigationOptions: {
        tabBarLabel: 'Menu',
        tabBarIcon: ({tintColor, inactiveTintColor}) => (
          <Icon
            name="home"
            color={tintColor}
            inactiveTintColor={inactiveTintColor}
          />
        ),
      },
    },
    Viagem: {
      screen: ViagemStack,
      navigationOptions: {
        tabBarLabel: 'Viagem',
        tabBarIcon: ({tintColor, inactiveTintColor}) => (
          <Icon
            name="navigation"
            color={tintColor}
            inactiveTintColor={inactiveTintColor}
          />
        ),
      },
    }, 
  },
  {
    tabBarOptions: {
      inactiveTintColor: '#9a9ba5',
      activeTintColor: '#fff',
      style: {backgroundColor: '#283593'},
    },
  },
);


const colabStack2 = createStackNavigator (
  
    {
      Home: {
        screen: colabTabs,
        navigationOptions: {headerShown: false},
  
      },
      VerificaReserva: {
        screen: VerificarReserva,
        navigationOptions: {
          headerBackTitleVisible: false,
          title: 'Verificar Reserva',
          headerStyle: {
            backgroundColor: '#283593',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      }
      },
      Perfil: {
        screen: Perfil,
        navigationOptions: {headerShown: false},
      },
      EditarDados: {
        screen: EditarDados,
        navigationOptions: {
          title: 'Editar Perfil',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#283593',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      },
      EditarEndereco: {
        screen: EditarEndereco,
        navigationOptions: {
          title: 'Editar Perfil',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#283593',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      },
      EditarSenha: {
        screen: EditarSenha,
        navigationOptions: {
          title: 'Editar Senha',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#283593',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      },
      
    },
    {initialRouteName: 'Home'},
);

/*---------------------------- */

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
  EsqueciSenha:{
    screen: EsqueciSenha,
    navigationOptions: {
      headerBackTitleVisible: false,
      title: 'Esqueci minha senha',
      headerStyle: {
        backgroundColor: '#283593',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  MudarSenha:{
    screen: MudarSenha,
    navigationOptions: {
      headerBackTitleVisible: false,
      title: 'Trocar senha',
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

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
