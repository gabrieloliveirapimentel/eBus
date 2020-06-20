import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, Footer, FooterTab, Text} from 'native-base';

Icon.loadFont();

function TabBar({style, onPress1, onPress2, color1, color2, ...rest}) {
  return (
    <Footer>
      <FooterTab style={{backgroundColor:'#283593'}}>
        <Button onPress={onPress1}>
          <Icon name="navigation" size={22} color={color1}/>
          <Text style={{color: (color1), textTransform:'capitalize'}}>Viagem</Text>
        </Button>
        <Button onPress={onPress2}>
          <Icon name="directions-bus" size={22} color={color2} />
          <Text style={{color: (color2),  textTransform:'capitalize'}}>Ônibus</Text>
        </Button>
      </FooterTab>
    </Footer>  
  );
}
export default TabBar;



