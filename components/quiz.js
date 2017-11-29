import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import QuizQuestion from './quiz-question';
import Styles from '../utils/styles';
import { clearNotification, notification } from '../utils/helper'

class Quiz extends React.Component {
    static navigationOptions = ({navigation}) => {
        const { state: { params: { actual = 0, total = 0, finished = false }} } = navigation;

        return {
            title: (finished)?'Finished':`${actual}/${total}`
        }
    }

    state = {
        questionIndex: 0,
        showAnswer: false,
        answers: []
    }

    componentDidMount(){
        const { cards, navigation } = this.props;

        navigation.setParams({
            actual: 1,
            total: cards.length,
            finished: false
        });
    }

    correctAnswer = () =>{
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

        if (nextQuestionIndex == cards.length){
            navigation.setParams({
                finished: true
            });

            clearNotification().then(notification);
        }
        else{
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

    showAnswer = (value) => this.setState({showAnswer: value});

    render(){
        const { questionIndex, showAnswer, answers } = this.state;
        const { cards } = this.props;

        if (questionIndex == cards.length){
            const totalCorrectAnswers = answers.filter(answer => answer).length;
            const totalIncorrectAnswers = cards.length - totalCorrectAnswers;
            const perc = totalCorrectAnswers / cards.length * 100;

            return (
                <View style={Styles.container}>
                    <Text> {totalCorrectAnswers} / {totalIncorrectAnswers} </Text>
                    <Text> { perc } % </Text>
                    <Button
                        title='Restart Quiz'
                        onPress={this.restartQuiz}
                    />
                    <Button 
                        title='Go Back'
                        onPress={this.goBack}
                    />
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