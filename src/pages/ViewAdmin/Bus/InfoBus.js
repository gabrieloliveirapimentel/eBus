import React, {useEffect, useState, useCallback} from 'react';
import {RefreshControl, ScrollView, Alert} from 'react-native';
import {
  ButtonView,
  InfoContainer,
  Form,
  FormText,
  SubButton,
  } from './styles';

export default function InfoBus ({ navigation }) {
  const {placa} = navigation.state.params;
  const {linha} = navigation.state.params;
  const {numVagas} = navigation.state.params;
  const {motorista} = navigation.state.params;
  const {disponivel} = navigation.state.params;
  const [disp, setDisp] = useState('');
  const [icon, setIcon] = useState('circle-outline');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (disponivel == true){
      setIcon('check-circle');
      setDisp('Disponível');
    } else { 
      setDisp ('Indisponível');
      setIcon('close-circle');
    }
  },[]);

  function dropBus (){
    fetch('http://mybus.projetoscomputacao.com.br/deleteBus_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        placa: placa,
        nome: motorista,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson=='Ônibus deletado!'){
          Alert.alert(responseJson);
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
        <FormText icon3="bus" text={linha}/>
        <FormText icon3="numeric" text={numVagas}/>
        <FormText icon3="account" text={motorista}/>
        <FormText icon3={icon} text={disp}/>
      </Form>
      <ButtonView>
        <SubButton
          onPress={() => navigation.navigate('EditBus', {
            placa: placa,
            linha: linha, 
            numVagas: numVagas, 
            motorista: motorista, 
            disponivel: disponivel
          })}
          >Editar
        </SubButton>
        <SubButton
          onPress={dropBus}
          >Deletar
        </SubButton>
      </ButtonView>
    </InfoContainer>
    </ScrollView> 
  );
}
