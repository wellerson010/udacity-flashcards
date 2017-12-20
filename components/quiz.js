import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import QuizQuestion from './quiz-question';
import Styles from '../utils/styles';
import { clearNotification, notification } from '../utils/helper'

class Quiz extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { state: { params: { actual = 0, total = 0, finished = false } } } = navigation;

        return {
            title: (finished) ? 'Finalizado' : (total === 0) ? 'Carregando...' : `${actual}/${total}`
        }
    }

    state = {
        questionIndex: 0,
        showAnswer: false,
        answers: []
    }

    componentDidMount() {
        const { cards, navigation } = this.props;

        navigation.setParams({
            actual: 1,
            total: cards.length,
            finished: false
        });
    }

    correctAnswer = () => {
        this.nextQuestion(true);
    }

    goBack = () => {
        const { navigation } = this.props;

        navigation.goBack();
    }

    incorrectAnswer = () => {
        this.nextQuestion(false);
    }

    nextQuestion = (isAnswerCorrect) => {
        const { navigation, cards } = this.props;
        const { questionIndex } = this.state;

        const nextQuestionIndex = questionIndex + 1;

        if (nextQuestionIndex == cards.length) {
            navigation.setParams({
                finished: true
            });

            clearNotification().then(notification);
        }
        else {
            navigation.setParams({
                actual: nextQuestionIndex + 1
            });
        }


        this.setState((state) => ({
            questionIndex: ++state.questionIndex,
            showAnswer: false,
            answers: state.answers.concat(isAnswerCorrect)
        }));
    }

    restartQuiz = () => {
        const { navigation } = this.props;

        navigation.setParams({
            finished: false,
            actual: 1
        });

        this.setState({
            questionIndex: 0,
            showAnswer: false,
            answers: []
        });
    }

    showAnswer = (value) => this.setState({ showAnswer: value });

    render() {
        const { questionIndex, showAnswer, answers } = this.state;
        const { cards } = this.props;

        if (questionIndex == cards.length) {
            const totalCorrectAnswers = answers.filter(answer => answer).length;
            const totalIncorrectAnswers = cards.length - totalCorrectAnswers;
            const perc = totalCorrectAnswers / cards.length * 100;

            return (
                <View style={[Styles.container, styles.container]}>
                    <Text style={styles.labelAnswerCorrect}> Respostas certas: {totalCorrectAnswers} </Text>
                    <Text style={styles.labelAnswerWrong}> Respostas erradas: {totalIncorrectAnswers} </Text>
                    <Text> Total de respostas: {totalCorrectAnswers + totalIncorrectAnswers} </Text>
                    <Text style={styles.labelPerc}> Você acertou {perc}% das respostas! </Text>
                    <TouchableOpacity
                        style={Styles.button}
                        onPress={this.restartQuiz}
                    >
                        <Text>
                            Reiniciar Quiz
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Styles.button}
                        onPress={this.goBack}
                    >
                        <Text>
                            Voltar
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        const questionActual = cards[questionIndex];

        return (
            <QuizQuestion
                question={questionActual.question}
                showAnswer={showAnswer}
                answer={questionActual.answer}
                handleShowAnswer={this.showAnswer}
                handleCorrect={this.correctAnswer}
                handleIncorrect={this.incorrectAnswer}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    labelAnswerCorrect: {
        color: '#229307'
    },
    labelAnswerWrong: {
        color: '#aa0808'
    },
    labelPerc: {
        marginBottom: 15
    }
});

const mapStateToProps = (state, { navigation }) => {
    const { deckId } = navigation.state.params;
    const deck = state[deckId];
    const { cards } = deck;

    return {
        deck,
        cards
    }
}

export default connect(mapStateToProps)(Quiz);