import { StyleSheet } from "react-native";

const quizScreenStyles = StyleSheet.create({
    quizContainer: {
        flex: 1,
        backgroundColor: '#0C3A5B',
        justifyContent: 'space-between'
    },
    headingContainer: {
        backgroundColor: '#0C3A5B',
        paddingTop: 20,
        paddingBottom:30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: 500,
        marginTop: 5,
        textTransform: "uppercase",
        color: '#ffffff'
    },
    currentScoreContainer: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    currentScore: {
        fontSize: 17,
        fontWeight: 500,
        color: '#ffffff',
        marginLeft: 7
    },
    questionsContainer: {
        paddingTop: 20,
        backgroundColor: '#ffffff',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    timerContainer: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex:10,
        top: 65,
        width: 56,
        height: 56,
        borderRadius: 38,
        backgroundColor: '#FFFFFF',
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 30,
        borderWidth: 6,
        borderStyle: 'solid',
        borderColor: '#00A0E3',
        opacity: 1
    },
    timer: {
        position: 'absolute',
        alignSelf: 'center',
        top: 15,
        fontSize: 13,
        color: '#374259',
        fontWeight: 500
    },
    questionNumber: {
        marginTop: 25,
        fontSize: 13,
        fontWeight: 600,
        color: '#000000'
    },
    questionText: {
        marginTop: 10,
        fontSize: 12,
        color: "#222222",
        fontWeight: 400,
        lineHeight: 22
    },
    optionsContainer: {
        marginTop: 10,
        paddingVertical: 65,
        paddingHorizontal: 50,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    nextButton: {
        paddingVertical: 10, width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 5
    },
    nextText: {
        fontSize: 13,
        fontWeight: 500,
        color: '#ffffff'
    }
})

export { quizScreenStyles }