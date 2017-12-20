import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Styles from '../utils/styles';
import { saveCard } from '../utils/api';
import { addCard } from '../actions';

class EditQuestion extends React.Component {
    static navigationOptions = {
        title: 'Nova Pergunta'
    }

    state = {
        question: '',
        answer: ''
    }

    save = async () => {
        const { question, answer } = this.state;
        const { navigation, deckId, addCard } = this.props;

        const card = await saveCard({
            answer,
            question,
            deckId
        });

        addCard(card, deckId);

        navigation.goBack();

        this.setState({
            question: '',
            answer: ''
        });
    }

    render() {
        const { question, answer } = this.state;

        return (
            <View style={styles.container}>
                <Text>
                    Pergunta
                </Text>
                <TextInput
                    style={styles.input}
                    value={question}
                    onChangeText={(question) => this.setState({ question })}
                />
                <Text>
                    Resposta
                </Text>
                <TextInput
                    style={styles.input}
                    value={answer}
                    onChangeText={(answer) => this.setState({ answer })}
                />

                <TouchableOpacity
                    style={Styles.button}
                    onPress={this.save}
                >
                    <Text>
                        Salvar
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        padding: 7
    }
});

const mapStateToProps = (state, { navigation }) => {
    const { deckId } = navigation.state.params;

    return {
        deckId
    }
}

const mapDispatchToProps = (dispatch) => ({
    addCard: (card, deckId) => dispatch(addCard(card, deckId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);