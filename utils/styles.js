import { StyleSheet } from 'react-native';

export const colors = {
    blue: '#73a9e5'
}

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerPadding: {
        padding: 10
    },
    centralize: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 10
    },
    button: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: colors.blue,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});