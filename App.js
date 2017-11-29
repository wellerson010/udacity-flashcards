import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Constants } from 'expo'

import Styles from './utils/styles';
import Deck from './components/deck';
import EditDeck from './components/edit-deck';
import EditQuestion from './components/edit-question';
import ListDeck from './components/list-deck';
import Quiz from './components/quiz';
import { getDecks } from './utils/api';
import reducer from './reducers';

import { notification } from './utils/helper';

const Stack = StackNavigator({
  ListDeck: {
    screen: ListDeck,
    navigationOptions: {
      header: null
    }
  },
  EditDeck: {
    screen: EditDeck
  },
  Deck: {
    screen: Deck
  },
  EditQuestion: {
    screen: EditQuestion,
    navigationOptions: {
      header: null
    }
  },
  Quiz: {
    screen: Quiz
  }
});

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  state = {
    dataLoaded: false,
    store: null
  }

  async componentDidMount(){
    const decks = await getDecks();
    const store = createStore(reducer, decks);

    notification();

    this.setState({
      store,
      dataLoaded: true
    });
  }

  render() {
    const { dataLoaded, store } = this.state;

    if (!dataLoaded){
      return <ActivityIndicator 
        style={Styles.container}
        size='large'
      />
    }
    return (
      <Provider store={store}>
        <View style={Styles.container}>
          <UdaciStatusBar backgroundColor='#ccc' barStyle="light-content" />
          <Stack style={Styles.container} />
        </View>
      </Provider>
    );
  }
}