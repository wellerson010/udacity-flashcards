import React from 'react';
import { View, Text, Button } from 'react-native';

import Styles from '../utils/styles';

const QuizQuestion = ({ question, answer, showAnswer, handleShowAnswer, handleIncorrect, handleCorrect }) => (
    <View style={Styles.container}>
        {
            (showAnswer) ?
                <View>
                    <Text>
                        {answer}
                    </Text>

                    <Button
                        title='Correct'
                        onPress={handleCorrect}
                    />

                    <Button
                        title='Incorrect'
                        onPress={handleIncorrect}
                    />

                    <Button
                        title='Show Question'
                        onPress={() => handleShowAnswer(false)}
                    />
                </View>
                :
                <View>
                    <Text>
                        {question}
                    </Text>
                    <Button
                        title='Show Answer'
                        onPress={() => handleShowAnswer(true)}
                    />
                </View>
        }
    </View>
);

export default QuizQuestion;