import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Styles, { colors } from '../utils/styles';

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

        if (deck.cards.length == 0) {
            alert('É necessário ao menos 1 card para iniciar o quiz!');
            return;
        }

        navigation.navigate('Quiz', {
            deckId: deck.id
        });
    }

    render() {
        const { deck } = this.props;
        console.log('deck', JSON.stringify(this.props.deck));

        return (
            <View style={[Styles.container, Styles.centralize]}>
                <Text style={style.title}>
                    {deck.title}
                </Text>
                <Text style={style.cards}>
                    {deck.cards.length} cartas
                </Text>
                <TouchableOpacity
                    onPress={this.startQuiz}
                    style={style.button}
                >
                    <Text>
                        Iniciar Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.addCard}
                    style={style.button}
                >
                    <Text>
                        Adicionar Carta
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state, { navigation }) => (
    {
        deck: state[navigation.state.params.id]
    }
)

const style = StyleSheet.create({
    button: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: colors.blue
    },
    cards: {
        marginBottom: 20
    },
    title: {
        fontSize: 30
    }
});

export default connect(mapStateToProps)(Deck);