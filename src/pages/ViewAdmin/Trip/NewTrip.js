import React, { useState, useEffect } from "react";
import { ScrollView, Alert, StyleSheet } from "react-native";
import { CheckBox } from "native-base";
import { Picker } from "native-base";

import { parseISO, format } from "date-fns";

import {
  BoxView,
  BoxText,
  NewContainer,
  Form,
  FormInput,
  SignLink,
  SubmitButton,
  TitleCheck,
  TextCheck,
  FormMaskInput,
  PickerContainer,
  PickerIcon,
  Placa,
} from "./styles";

export default function NewBus({ navigation }) {
  const [Data, setData] = useState("");
  const [Horario, setHorario] = useState("");
  const [Origem, setOrigem] = useState("");
  const [Destino, setDestino] = useState("");

  const [checkBox, setCheckBox] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);

  const [dataSource, setdataSource] = useState([]);

  function NewTrip() {
    if (Data == "" || Horario == "" || Origem == "" || Destino == "") {
      Alert.alert("Campos em branco", "Verifique os dados e tente novamente!");
    } else {
      fetch("http://mybus.projetoscomputacao.com.br/inserirViagem_api.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: Data,
          horario: Horario,
          origem: Origem,
          destino: Destino,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == "Viagem cadastrada!") {
            Alert.alert(responseJson);
            navigation.goBack();
          } else {
            Alert.alert(responseJson);
          }
          // Showing response message coming from server after inserting records.
        })
        .catch((error) => {
          Alert.alert("Erro na conexão", "Verifique sua internet!");
        });
    }
  }

  return (
    <ScrollView animated="false" style={{ marginHorizontal: 0 }}>
      <NewContainer>
        <Form>
          <FormMaskInput
            icon3="calendar"
            type={"datetime"}
            value={Data}
            options={{
              format: "YYYY/MM/DD",
            }}
            placeholder="Data"
            placeholderTextColor="rgba(0,0,255,0.4)"
            onChangeText={(data) => setData(data)}
          />

          <FormMaskInput
            icon="access-time"
            type={"datetime"}
            value={Horario}
            options={{
              format: "HH:mm",
            }}
            placeholder="Horario"
            placeholderTextColor="rgba(0,0,255,0.4)"
            onChangeText={(data) => setHorario(data)}
          />

          <FormInput
            icon3="map-marker"
            autoCapitalize="none"
            autoCorrect={true}
            placeholder="Origem"
            onChangeText={(data) => setOrigem(data)}
          />
          <FormInput
            icon3="map-marker-radius"
            autoCorrect={true}
            autoCapitalize="sentences"
            placeholder="Destino"
            onChangeText={(data) => setDestino(data)}
          />
        </Form>

        <SignLink>
          <SubmitButton onPress={NewTrip}>Cadastrar</SubmitButton>
        </SignLink>
      </NewContainer>
    </ScrollView>
  );
}

/*
export class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      horario: "",
      origem: "",
      destino: "",
      placa: '',
      loading: true,
    };
  }
  registration_Function = () => {
    fetch("http://192.168.100.6/inserirViagem_api.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: this.state.data,
        horario: this.state.horario,
        origem: this.state.origem,
        destino: this.state.destino,

        placa: this.state.placa,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == "Viagem cadastrada!") {
          Alert.alert(responseJson);
          this.props.navigation.navigate("Login");
          this.props.navigation.goBack();
        } else {
          Alert.alert(responseJson);
        }
        // Showing response message coming from server after inserting records.
      })
      .catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
        this.setState({loading:false});
      });
  };

  componentDidMount() {

    return fetch("http://mybus.projetoscomputacao.com.br/listBus_api.php")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            dataSource: responseJson,
            loading: false
        });
      })
      .catch((error) => {
        Alert.alert("Erro na conexão", "Verifique sua internet!");
      });

  }

  render() {
    if (this.state.loading) {
      return <View></View>;
    } else {
      return (
        <ScrollView animated="false" style={styles.scrollView}>
          <StatusBar backgroundColor="#283593" barStyle="light-content" />
          <Container>
              <Form>
              <Text style={{margin: 5, paddingTop: 10}}>Data: </Text>
              <View style={styles.campoStyle}>
                <TextInputMask
                  style={styles.text}
                  type={"datetime"}
                  options={{
                    format: "YYYY/MM/DD",
                  }}
                  value={this.state.data}
                  placeholder="* Data"
                  placeholderTextColor="rgba(0,0,255,0.4)"
                  onChangeText={(data) => {
                    this.setState({
                      data: data,
                    });
                  }}
                />
              </View>
              
              <Text style={{margin: 5, paddingTop: 10}}>Horário: </Text>
              <View style={styles.campoStyle}>
                <TextInputMask
                  style={styles.text}
                  type={"datetime"}
                  options={{
                    format: "HH:mm",
                  }}
                  value={this.state.horario}
                  placeholder="* Horário"
                  placeholderTextColor="rgba(0,0,255,0.4)"
                  onChangeText={(data) => {
                    this.setState({
                      horario: data,
                    });
                  }}
                />
              </View>

              <Text style={{margin: 5, paddingTop: 10}}>Origem: </Text>
              <FormInput
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                placeholder="* Origem"
                onChangeText={(data) => this.setState({ origem: data })}
              />

              <Text style={{margin: 5, paddingTop: 10}}>Destino: </Text>
              <FormInput
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                placeholder="* Destino"
                onChangeText={(data) => this.setState({ destino: data })}
              />
            
              <Text style={{margin: 5, paddingTop: 10}}>Placa: </Text>
              <View style={styles.campopickerStyle}>
                <Picker
                  selectedValue={this.state.placa}
                  onValueChange={(itemvalue, itemIndex) =>
                    this.setState({placa: itemvalue})
                  }
                  style={styles.pickerStyle}>
                  {this.state.dataSource.map((item, key) => (
                  <Picker.Item style={{marginLeft: 15}} label={item.placa} value={item.placa} key={key}/>
                ))}
                </Picker>
              </View>
             </Form> 
              <Button
                style={styles.button}
                onPress={this.registration_Function}
                title="Confirmar"
              >
                <Text style={styles.textButton}>Confirmar</Text>
              </Button>

              <Text style={{marginTop:10, fontSize: 13, marginBottom: 20}}>* Campos obrigatórios</Text>
            
          </Container>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
  },
  PickerInput: {
    marginBottom: 10,
  },
  button: {
    height: 40,
    width: 200,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor:'#283593',
  },
  textButton: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: 16,
  },
  textSubmit: {
    marginTop: 10,
    marginBottom: 15,
    justifyContent: "center",
    color: "#283593",
    fontSize: 16,
    fontWeight: "bold",
  },
  campoStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    height: 46,
    marginBottom: 10,
  },
  campopickerStyle:{
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    height: 46,
    justifyContent:'center',
    marginBottom: 10,

  },
  pickerStyle: {
    color:'rgba(0,0,255,0.8)',
    height: 46,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 25,
  },
  text: {
    fontSize: 15,
    color: "rgba(0,0,255,0.8)",
    marginLeft: 25,
    marginTop: 10,
  },
});
*/
