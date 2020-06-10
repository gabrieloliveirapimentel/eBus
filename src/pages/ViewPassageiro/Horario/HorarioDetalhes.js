/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import {Text} from 'native-base';

export class HorarioDetalhes extends React.Component {
  render (){
      return (
            <View style={{flex:1}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text>Tela de Detalhes de Horário</Text>
                </View>
            </View>
      );
  }
}