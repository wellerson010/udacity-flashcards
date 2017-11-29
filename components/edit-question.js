import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';

import { saveCard } from '../utils/api';
import { addCard } from '../actions';

class EditQuestion extends React.Component {
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
            <View>
                <Text>
                    Question
                </Text>
                <TextInput
                    value={question}
                    onChangeText={(question) => this.setState({ question })}
                />
                <Text>
                    Answer
                </Text>
                <TextInput
                    value={answer}
                    onChangeText={(answer) => this.setState({ answer })}
                />

                <Button
                    title='Save Card'
                    onPress={this.save}
                />
            </View>
        )
    }
}

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