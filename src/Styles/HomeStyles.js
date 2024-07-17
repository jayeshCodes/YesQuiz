import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    firstBlock: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 16,
        elevation: 10,
        boxShadow: '0px 6px 15px #0000000F',
    },
    profilePicture: {
        height: 60,
        width: 60,
        borderWidth: 2,
        borderColor: '#374259',
        borderRadius: 30,
        marginTop: 16,
        marginRight: 10
    },
    insideView1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%'
    },
    beginnerText: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '500',
        paddingTop: 10
    },
    Text500: {
        fontSize: 12,
        color: '#394257',
        fontWeight: '700',
        marginRight: 10
    },
    blankView1: {
        width: '70%',
        height: 9,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        marginTop: 6
    },
    blankView2: {
        width: '60%',
        backgroundColor: '#374259',
        height: 9,
        borderRadius: 5
    },
    secondBlock: {
        marginVertical: 20,
        marginHorizontal: 8,
        backgroundColor: 'transparent',
        borderColor: '#DCE7FF',
        borderWidth: 1.5,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    aboutText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#0E0E0E'
    },
    descriptionText: {
        fontSize: 10,
        fontWeight: '400',
        marginTop: 14,
        color: '#0E0E0E',
        lineHeight: 15
    },
    thirdBlock: {
        marginHorizontal: 8,
        backgroundColor: '#ffffff',
        borderRadius: 10
    },
    insideView2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 15
    },
    mainExamText: {
        fontSize: 12,
        color: '#374259',
        fontWeight: '500'
    },
    blankView3: {
        backgroundColor: 'lightgrey',
        height: 2,
        width: '90%',
        borderRadius: 5,
        margin: 15
    },
    liveText: {
        fontSize: 12,
        color: '#0000005A',
        fontWeight: '500'
    },
    dateText: {
        fontSize: 12,
        color: '#42A82D',
        marginLeft: 3
    },
    countdownContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 10
    },
    countdownBox: {
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdownText: {
        fontSize: 10,
        fontWeight: '400',
        color: '#394257'
    },
    countdownNumber: {
        fontSize: 24,
        fontWeight: '500',
        color: '#394257'
    },
    reminderButton: {
        paddingVertical: 8,
        width: '100%',
        backgroundColor: '#93AADA',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    reminderText: {
        fontSize: 10,
        color: 'white',
        fontWeight: '500'
    },
    fourthBlock: {
        marginHorizontal: 8,
        marginTop: 25,
        padding: 15,
        backgroundColor: '#ABBDEA',
        borderRadius: 10
    },
    headingLeaderboardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    headingLeaderboardText: {
        fontSize: 12,
        fontWeight: 500,
        color: '#0E0E0E'
    },
    fullLeaderboard: {
        fontSize: 12,
        fontWeight: 400,
        color: '#0E0E0E'
    },
    leaderboardCard: {
        marginTop: 12,
        backgroundColor: "#F7F7F7",
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    riyaText: {
        fontSize: 12,
        color: '#374259',
        fontWeight: 400,
        marginTop: 10
    },
    imageRiya: {
        width: 55,
        height: 55, 
    },
    imageKuldeep: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 4,
        borderColor: '#F3AE3D'
    },
    kuldeepText: {
        fontSize: 12,
        color: '#374259',
        fontWeight: 400,
        marginTop: 10,
    },
    imageKaran: {
        width: 50,
        height: 50,
    },
    karanText: {
        fontSize: 12,
        color: '#374259',
        fontWeight: 400,
        marginTop: 10,
        alignSelf:'center'
    },
    headingQuizView: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        marginTop: 20
    },
    headingQuizText: {
        fontSize: 12,
        fontWeight: 500,
        color: '#374259'
    },
    fifthBlock: {
        marginVertical: 25,
        marginHorizontal: 8,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    shareText: {
        fontSize: 12,
        color: '#374259',
        fontWeight: 400,
        opacity: 0.5
    },
    shareButton: {
        paddingHorizontal: 27,
        backgroundColor: '#374259',
        borderWidth:1,
        borderColor:'#667CAA' ,
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        borderRadius: 5
    },
    bottomSheetContainer: {
        paddingVertical: 16,
        paddingHorizontal: 25
    },
    bottomSheetHeader: {
        fontSize: 14,
        fontWeight: 600,
        color: '#394257',
        textAlign: 'center'
    },
    pointsContainer: {
        marginTop: 55,
        flexDirection: 'row',
        alignItems: 'center'
    },
    pointsText: {
        fontSize: 12,
        fontWeight: 500,
        color: '#3B4255',
        marginLeft: 8
    },
    bottomSheetSubText: {
        fontSize: 10,
        fontWeight: 500,
        color: '#1E1E1E',
        lineHeight: 18,
        marginTop: 6
    },
    lifelinesContainer: {
        flexDirection: 'row',
        marginTop: 25,
        alignItems: 'center'
    },
    pollsIconContainer: {
        width: 20,
        height: 20,
        backgroundColor: '#6EDBA9',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '45deg' }],
        transformOrigin: { x: 0, y: 0 },
        overflow: 'hidden',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ffffff',
        elevation: 10
    },
    lifelineIcon: {
        fontSize: 12,
        fontWeight: 500,
        color: '#ffffff',
        transform: [{ rotate: '-45deg' }]
    },
    lifelineText: {
        fontSize: 12,
        fontWeight: 500,
        color: '#42003F',
        marginLeft: 8
    },
    fiftyFiftyIconContainer: {
        width: 20,
        height: 20,
        backgroundColor: '#6EDBCE',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '45deg' }],
        transformOrigin: { x: 0, y: 0 },
        overflow: 'hidden',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ffffff',
        elevation: 10
    },
    startButton: {
        marginTop: 40,
        backgroundColor: '#394257',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 11,
        borderRadius: 10
    },
    startText: {
        fontSize: 16,
        fontWeight: 500,
        color: '#FFFFFF'
    },
    initialsCircle: {
        width: 50, // Adjust size as needed
        height: 50, // Adjust size as needed
        borderRadius: 25, // Half of width/height to make it circular
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#ABBDEA', // Any background color
        justifyContent: 'center',
        alignItems: 'center',
      },
      initialsText: {
        color: '#000', // Text color
        fontWeight: 'bold',
      },
})

export { homeStyles }