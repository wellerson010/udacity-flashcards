import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Styles from '../utils/styles';
import { saveDeck } from '../utils/api';
import { addDeck } from '../actions';

class EditDeck extends React.Component {
    static navigationOptions = {
        title: 'New Deck'
    }

    state = {
        title: '',
    }

    save = async () => {
        const { title } = this.state;
        const { navigation, addDeck } = this.props;

        const deck = await saveDeck(title);
        
        addDeck(deck);
        
        navigation.goBack();

        this.setState({
            title: ''
        });
    }

    render() {
        const { title } = this.state;
        const { decks } = this.props;

        return (
            <View style={[Styles.container, Styles.containerPadding]}>
                <Text style={styles.title}>Title</Text>
                <TextInput
                    style={Styles.input}
                    value={title}
                    onChangeText={(value) => this.setState({title: value})}
                />

                <Button 
                    onPress={this.save}
                    title='Criar Deck'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    }
});

const mapStateToProps = (state) => ({
    decks: state
});

const mapDispatchToProps = (dispatch) => ({
    addDeck: (data) => dispatch(addDeck(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck);