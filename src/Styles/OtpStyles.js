import { StyleSheet } from "react-native";

const otpStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative'
    },
    topImage: {
        position: 'absolute',
        right: -40,
        top: -15
    },
    bottomImage: {
        position: 'absolute',
        bottom: -85,
        left: -40
    },
    otpContainer: {
        position: 'absolute',
        top: 150,
        padding: 20
    },
    initialText: {
        fontSize: 20,
        fontWeight: 500,
        color: 'white'
    },
    otpHeader: {
        fontSize: 10,
        fontWeight: 400,
        color: 'white',
        marginTop: 10
    },
    continueText: {
        fontSize: 16,
        fontWeight: 500,
        color: 'white'
    }

})

export { otpStyles }