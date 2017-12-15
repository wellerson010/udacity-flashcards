import React from 'react';
import { TouchableOpacity, Animated, Text } from 'react-native';

class ListDeckRow extends React.Component {
    state = {
        bounce: new Animated.Value(1)
    }

    animateTap() {
        const { item } = this.props;
        const { bounce } = this.state;

        Animated.sequence([
            Animated.timing(bounce, {
                duration: 200,
                toValue: 1.06
            }),
            Animated.spring(bounce, {
                toValue: 1,
                friction: 3
            })
        ]).start(() => {
            this.props.handleItemTap(item);
        });
    }

    render() {
        const { item } = this.props;
        const { bounce } = this.state;

        return (
            <TouchableOpacity style={styles.itemList} onPress={() => this.animateTap(item)}>
                <Animated.Text style={[styles.itemListHeader, { transform: [{ scale: bounce }] }]}>
                    {item.title}
                </Animated.Text>
                <Text>
                    {item.cards.length} cartas
                            </Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
    itemList: {
        padding: 15
    },
    itemListHeader: {
        fontSize: 20
    }
}

export default ListDeckRow;