import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import headerImage from '../../assets/header-image.png'

const LoginConfirmation = ({ navigation }) => {

    const [show, setShow] = useState(false)
    const [selectYes, setSelectYes] = useState(false)
    const [selectNo, setSelectNo] = useState(false)
    const [enrollNumber, setEnrollNumber] = useState('')
    const disable = enrollNumber.length === 0
    const validate = () => {
        if(selectYes) {
            if(enrollNumber.length !== 9) {
                alert('Enrollment Number should be 9 digits long.')
            } else {
                navigation.navigate('ProfilePicture')
                setEnrollNumber('')
            }
        } else {
            navigation.navigate('ProfilePicture')
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#374259' }}>
            <Image source={headerImage} style={{ alignSelf: 'flex-end', right: -40, top: -15 }} />
            <View style={{ marginTop: 70, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', fontWeight: 500 }}>
                    Are you student of{'\n'}Yes Academy ?
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 20, paddingVertical: 14, backgroundColor: selectYes ? '#6A89CC' : 'white', borderRadius: 5, marginRight: 25 }}
                        onPress={() => {
                            setShow(!show)
                            setSelectYes(!selectYes)
                        }}
                    >
                        <Text style={{ fontSize: 12, fontWeight: 400, color: 'black' }}>
                            Yes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 20, paddingVertical: 14, backgroundColor: selectNo ? '#6A89CC' : 'white', borderRadius: 5 }}
                        onPress={() => {
                            navigation.navigate('ProfilePicture')
                            setSelectNo(!selectNo)
                        }}
                    >
                        <Text style={{ fontSize: 12, fontWeight: 400, color: 'black' }}>
                            No
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 60 }}>
                {show &&
                    <>
                        <Text style={{ fontSize: 12, fontWeight: 400, color: 'white' }}>
                            Enter your enrollment number
                        </Text>
                        <TextInput
                            style={{ marginTop: 11, paddingHorizontal: 12, backgroundColor: 'white', borderRadius: 5 }}
                            placeholder='Enter your enrolment number here'
                            maxLength={9}
                            onChangeText={(text) => setEnrollNumber(text)}
                        />
                    </>}
                <TouchableOpacity
                    style={{
                        paddingVertical: 15, width: '60%',
                        justifyContent: 'center', alignItems: 'center',
                        backgroundColor: disable ? '#C4C4C4' : '#6989CC',
                        alignSelf: 'center', borderRadius: 10, marginTop: 120
                    }}
                    onPress={() => validate()}
                    disabled={disable}
                >
                    <Text style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginConfirmation