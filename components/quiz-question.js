import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Styles from '../utils/styles';

const QuizQuestion = ({ question, answer, showAnswer, handleShowAnswer, handleIncorrect, handleCorrect }) => (
    <View style={[Styles.container, styles.container]}>
        {
            (showAnswer) ?
                <View>
                    <Text style={styles.title}>
                        {answer}
                    </Text>

                    <TouchableOpacity
                        style={Styles.button}
                        onPress={handleCorrect}
                    >
                        <Text>
                            Correto
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={Styles.button}
                        title='Incorreto'
                        onPress={handleIncorrect}
                    >
                        <Text>
                            Incorreto
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={Styles.button}
                        onPress={() => handleShowAnswer(false)}
                    >
                        <Text>
                            Mostrar pergunta
                        </Text>
                    </TouchableOpacity>

                </View>
                :
                <View>
                    <Text style={styles.title}>
                        {question}
                    </Text>
                    <TouchableOpacity
                         style={Styles.button}
                        onPress={() => handleShowAnswer(true)}
                    >
                     <Text>
                        Mostrar resposta
                    </Text>
                    </TouchableOpacity>
                </View>
        }
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontSize: 20,
        marginBottom: 15
    }
});

export default QuizQuestion;