import React from 'react';
import { View, Text, ToolbarAndroid, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'

import ListDeckRow from './list-deck-row';
import Styles from '../utils/styles';

class ListDeck extends React.Component {
    actionsToolbar = [{
        title: 'Adicionar Deck',
        show: 'always'
    }];

    goToDeck = ({ id, title }) => {
        const { navigation } = this.props;

        navigation.navigate('Deck', {
            id,
            title
        });
    }

    onActionSelected = (option) => {
        const { navigation } = this.props;

        switch (option) {
            case 0:
                navigation.navigate('EditDeck');
                break;
        }
    }

    render() {
        const { decks } = this.props;

        const dataToFlatList = Object.entries(decks).map(item => item[1]);

        return (
            <View style={Styles.container}>
                <ToolbarAndroid
                    title='FlashCards'
                    actions={this.actionsToolbar}
                    style={styles.toolbar}
                    onActionSelected={this.onActionSelected}
                />
                <FlatList
                    data={dataToFlatList}
                    renderItem={({ item }) => (
                        <ListDeckRow
                            item={item}
                            handleItemTap={this.goToDeck}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 54,
        backgroundColor: '#43a1f8'
    },
    itemList: {
        padding: 15
    },
    itemListHeader: {
        fontSize: 20
    }
});

const mapStateToProps = (state) => ({
    decks: state
});

export default connect(mapStateToProps)(ListDeck);