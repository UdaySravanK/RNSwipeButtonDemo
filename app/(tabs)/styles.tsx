import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        },
        reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    container: {padding: 5, paddingTop: 50, paddingBottom: 15},
    title: {
        fontSize: 20,
        textAlign: 'center',
        padding: 5
    }
});

export default Styles;