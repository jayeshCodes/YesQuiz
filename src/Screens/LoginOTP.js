import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import backgroundImage from '../../assets/splash-screen.png'
import headerImage from '../../assets/header-image.png'
import OTPInput from '../Components/OtpBox'
import { otpStyles } from '../Styles/OtpStyles'

const LoginOTP = ({ navigation }) => {

    const [otpCode, setOtpCode] = useState("")
    const [pinReady, setPinReady] = useState(false)
    const disable = otpCode.length != 6
    const MAX_LENGTH = 6
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    position: 'relative'
                }}
            />
            <View style={otpStyles.topImage}>
                <Image source={headerImage} />
            </View>
            <View style={otpStyles.bottomImage}>
                <Image source={headerImage} />
            </View>
            <View style={otpStyles.otpContainer}>
                <Text style={otpStyles.initialText}>
                    Verify your{"\n"}
                    Mobile Number ?
                </Text>
                <Text style={otpStyles.otpHeader}>
                    Enter the code we’ve sent by text to +916393642919
                </Text>
                <View style={{ left: -5, marginTop: 45 }}>
                    <OTPInput
                        code={otpCode}
                        setCode={setOtpCode}
                        maximumLength={MAX_LENGTH}
                        setIsPinReady={setPinReady}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{
                    paddingVertical: 15,
                    width: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 85,
                    backgroundColor: disable ? '#C4C4C4' : '#6989CC',
                    alignSelf: 'center',
                    borderRadius: 10
                }}
                onPress={() => {
                    navigation.navigate('LoginDetails')
                }}
                disabled={disable}
            >
                <Text style={otpStyles.continueText}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    )
}


export default LoginOTP