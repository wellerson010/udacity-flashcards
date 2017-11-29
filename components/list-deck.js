import React from 'react';
import { View, Text, ToolbarAndroid, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Styles from '../utils/styles';

class ListDeck extends React.Component {
    actionsToolbar = [{
        title: 'Add Card',
        icon: require('../assets/plus.png'),
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
                        <TouchableOpacity style={styles.itemList} onPress={() => this.goToDeck(item)}>
                            <Text style={styles.itemListHeader}>
                                {item.title}
                            </Text>
                            <Text>
                                {item.cards.length} cards
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 54
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