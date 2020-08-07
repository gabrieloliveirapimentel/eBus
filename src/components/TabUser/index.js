import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Footer, FooterTab, Text} from 'native-base';

Icon.loadFont();

function TabBar({style, onPress1, onPress2, onPress3, color1, color2, color3, ...rest}) {
  return (
    <Footer>
      <FooterTab style={{backgroundColor:'#283593'}}>
        <Button onPress={onPress1}>
          <Icon name="plus-circle-outline" size={24} color={color1}/>
          <Text style={{color: (color1), textTransform:'capitalize'}}>Reservar</Text>
        </Button>
        <Button onPress={onPress2}>
          <Icon name="bus" size={24} color={color2} />
          <Text style={{color: (color2),  textTransform:'capitalize'}}>Reservas</Text>
        </Button>
        <Button onPress={onPress3}>
          <Icon name="clock-outline" size={24} color={color3} />
          <Text style={{color: (color3),  textTransform:'capitalize'}}>Horários</Text>
        </Button>
      </FooterTab>
    </Footer>  
  );
}
export default TabBar;



