import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, Footer, FooterTab, Text} from 'native-base';

Icon.loadFont();

function TabColab({style, onPress1, onPress2, color1, color2, ...rest}) {
  return (
    <Footer>
      <FooterTab style={{backgroundColor:'#283593'}}>
        <Button onPress={onPress1}>
          <Icon name="navigation" size={22} color={color1}/>
          <Text style={{color: (color1), textTransform:'capitalize'}}>Viagem</Text>
        </Button>
        <Button onPress={onPress2}>
          <Icon name="school" size={22} color={color2} />
          <Text style={{color: (color2),  textTransform:'capitalize'}}>Instituição</Text>
        </Button>
      </FooterTab>
    </Footer>  
  );
}
export default TabColab;
