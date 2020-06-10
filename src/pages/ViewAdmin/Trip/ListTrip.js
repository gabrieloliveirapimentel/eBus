/* eslint-disable prettier/prettier */
import React from "react";
import {ActivityIndicator, View, StyleSheet, StatusBar, FlatList, Text } from "react-native";
import {
  Button,
  Header,
  Body,
  Right,
  Fab,
} from "native-base";
import { Icon } from "react-native-elements";

export class ListTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching_Status: false,
      refreshing: false,
      loading: true,
    };
  }

  componentDidMount() {
    return fetch("http://mybus.projetoscomputacao.com.br/listTrip_api.php")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            dataSource: responseJson,
            fetching_Status: true,
            refreshing: false,
            loading: false,
          },
          function () {
            // In this block you can do something with new state.
          }
        );
      })
      .catch((error) => {
        Alert.alert('Erro na conexão', 'Verifique sua internet!');
        this.setState({loading:false, refreshing: false});
      });
  }

  refreshList = () => {
    this.setState(
      {
        refreshing: true,
        fetching_Status: true,
      },
      () => {
        this.componentDidMount();
      }
    );
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#f0f0f0",
        }}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" color="#283593" /></View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header title="Menu" isHome={true} style={styles.containerheader}>
          <StatusBar backgroundColor="#283593" barStyle="light-content" />
          <Body style={{ paddingLeft: 20 }}>
            <Text style={styles.textHeader}>Viagem</Text>
          </Body>
          <Right>
            <Button transparent onPress={this.refreshList}>
              <Icon name="refresh" color="#fff" />
            </Button>
          </Right>
        </Header>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={this.refreshList}
              data={this.state.dataSource}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({ item }) => (
                <Text
                  style={styles.FlatListitems}
                  onPress={() => {
                    this.props.navigation.navigate("InfoTrip", {
                      data: item.data,
                      horario: item.horario,
                      origem: item.origem,
                      destino: item.destino,
                      id_viagem: item.id_viagem,
                    });
                  }}
                >
                  {item.origem} - {item.destino} ({item.horario})
                </Text>
              )}
              keyExtractor={(item, index) => index}
            />
          <Fab
            onPress={() => {this.props.navigation.navigate('NewTrip')}}
            style={{ backgroundColor: "#283593" }}
            position="bottomRight"
          >
            <Icon name="add" color="#fff" />
          </Fab>
      </View>
    );}
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
  },
  containerheader: {
    backgroundColor: "#283593",
    paddingTop: 10,
    height: 70,
  },
  FlatListitems: {
    fontSize: 18,
    color: "#000",
    padding: 10,
  },
  textHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});