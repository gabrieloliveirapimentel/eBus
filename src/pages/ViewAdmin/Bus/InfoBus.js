import React, {useEffect, useState, useCallback} from 'react';
import {RefreshControl, ScrollView, Alert} from 'react-native';
import {
  ButtonView,
  InfoContainer,
  Form,
  FormText,
  SubButton
  } from './styles';

export default function InfoBus ({ navigation }) {
  const {placa} = navigation.state.params;
  const {linha} = navigation.state.params;
  const {lugares} = navigation.state.params;
  const {motorista} = navigation.state.params;
  const {disponivel} = navigation.state.params;
  const {situacao} = navigation.state.params;
  const [disp, setDisp] = useState('');
  const [icon, setIcon] = useState('circle-outline');
  const [statusIcon, setStatusIcon] = useState('bus');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (disponivel == true){
      setIcon('check-circle');
      setStatusIcon('bus');
      setDisp('Disponível');
    } else { 
      setDisp ('Indisponível');
      setStatusIcon('bus-alert');
      setIcon('close-circle');
    }
  },[]);

  function dropBus (){
    fetch('http://ebus.projetoscomputacao.com.br/backend/disableBus_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        placa: placa,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson=='Ônibus removido!'){
          Alert.alert('Ônibus removido!', 'O ônibus foi removido com sucesso.');
          navigation.goBack();}
        else { 
          Alert.alert(responseJson);
        }
    }).catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, [refreshing]);

  
  return (
    <ScrollView animated='false'contentContainerStyle={{flex:1}} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <InfoContainer>
      <Form>
        <FormText icon3="card-text-outline" text={placa}/>
        <FormText icon3="map-marker-distance" text={linha}/>
        <FormText icon3="numeric" text={lugares}/>
        <FormText icon3="account" text={motorista}/>
        <FormText icon3={icon} text={disp}/>
        <FormText icon3={statusIcon} text={situacao}/>
      </Form>
      <ButtonView>
      <SubButton
          onPress={() => navigation.navigate('EditBus', {
            placa: placa,
            linha: linha, 
            lugares: lugares, 
            motorista: motorista, 
            disponivel: disponivel,
            situacao: situacao,
          })}
          >Editar
        </SubButton>
        <SubButton
          onPress={dropBus}
          >Remover
        </SubButton>
      </ButtonView>
    </InfoContainer>
    </ScrollView> 
  );
}
