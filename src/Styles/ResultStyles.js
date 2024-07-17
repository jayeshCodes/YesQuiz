import { StyleSheet } from "react-native";

const resultStyles = StyleSheet.create({
    resultContainer: {
        flex: 1,
        backgroundColor: '#394257',
        paddingHorizontal: 24,
        paddingVertical: 20
    },
    headerText: {
        fontSize: 35, fontWeight: 500, color: '#FFFFFF'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    imageStyle: {
        borderWidth: 10,
        borderColor: '#F4C77D',
        borderRadius: 60,
    },
    userText: {
        fontSize: 20,
        fontWeight: 200,
        color: '#FFFFFF',
        marginTop: 10
    },
    congratsText: {
        fontSize: 35,
        fontWeight: 600,
        color: '#ffffff',
        marginVertical: 15
    },
    congratsSubText: {
        fontSize: 16,
        fontWeight: 600,
        color: '#EDC987',
    },
    pointsView: {
        flexDirection: 'row',
        marginTop: 35,
        backgroundColor: '#83BBEF',
        paddingVertical: 15,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },
    pointsText: {
        fontSize: 24,
        fontWeight: 600,
        color: '#ffffff',
        marginRight: 14
    },
    accuracyView: {
        flexDirection: 'row',
        marginTop: 50,
        paddingVertical: 10,
        paddingHorizontal: 60,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    accuracyText: {
        fontSize: 17,
        fontWeight: 700,
        color: '#42003F',
        fontStyle: 'italic'
    },
    timeText: {
        fontSize: 14,
        fontWeight: 500,
        color: 'grey',
        marginTop: 20,
        textAlign: 'center'
    },
    correctText: {
        fontSize: 14,
        fontWeight: 500,
        color: '#ffffff',
        marginTop: 10,
        textAlign: 'center'
    },
    bottomIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    bottomContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    homeIconContainer: {
        backgroundColor: '#ABD0FD',
        paddingVertical: 20,
        paddingHorizontal: 18,
        alignItems: 'center',
        borderRadius: 10
    },
    bottomText: {
        fontSize: 12,
        fontWeight: 500,
        color: '#ffffff',
        marginTop: 6
    },
    shareIconContainer: {
        backgroundColor: '#F0C891',
        paddingVertical: 20,
        paddingHorizontal: 18,
        alignItems: 'center',
        borderRadius: 10
    }
})

export { resultStyles }