import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import Styles from '../utils/styles';

class Deck extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;

        return {
            title 
        }
    }

    addCard = () => {
        const { navigation, deck } = this.props;

        navigation.navigate('EditQuestion', {
            deckId: deck.id
        });
    }

    startQuiz = () => {
        const { deck, navigation } = this.props;

        if (deck.cards.length == 0){
            alert('É necessário ao menos 1 card para iniciar o quiz!');
            return;
        }

        navigation.navigate('Quiz', {
            deckId: deck.id
        });
    }

    render() {
        const { deck } = this.props;
        console.log('deck', JSON.stringify(this.props.deck ));

        return (
            <View style={[Styles.container, Styles.centralize]}>
                <Text>
                    { deck.title }
                </Text>
                <Text>
                    { deck.cards.length } cards
                </Text>
                <Button 
                    title='Start Quiz'
                    onPress={this.startQuiz}
                />
                <Button
                    title='Add Card'
                    onPress={this.addCard}
                />
            </View>
        )
    }
}

const mapStateToProps = (state, { navigation }) => (
    {
        deck: state[navigation.state.params.id]
    }
)

export default connect(mapStateToProps)(Deck);