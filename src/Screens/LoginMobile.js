import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import backgroundImage from '../../assets/splash-screen.png';
import headerImage from '../../assets/header-image.png';
import { RenderError } from '../Constants/Util';
import auth from '@react-native-firebase/auth';
import LoginOTP from './LoginOTP';
import { otpStyles } from '../Styles/OtpStyles';
import OTPTextView from 'react-native-otp-textinput';
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const LoginMobile = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState({});
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const disable = mobileNumber.length != 10;
    
    // let code = "";
    const OTPdisable = code.length != 6;

    function getCode(text) {
        code += text;
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function onAuthStateChanged(user) {
        if (user) {
            // User is signed in, navigate to the next screen or show a success message
            Alert.alert('Success', 'You have successfully logged in.');
            // navigation.navigate('HomePage'); // Replace 'HomePage' with your target screen
            user.getIdToken().then(function (idToken) {  // <------ Check this line
                // console.log(user) // It shows the Firebase token now
                // return idToken;
                if (idToken) navigation.navigate('HomePage');
            });


        }
    }
    // auth.currentUser.getIdToken(/ forceRefresh / true)
    //     .then(function (idToken) {
    //         console.log(idToken);
    //     }).catch(function (error) {

    //     });

    async function signInWithPhoneNumber(phoneNumber) {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
            console.log(confirmation);
        } catch (error) {
            console.log('Error sending SMS:', error);
            Alert.alert('Error', 'Failed to send OTP. Please try again.');
            console.log(phoneNumber);
            navigation.navigate(LoginMobile);
        }
    }

    async function confirmCode() {
        try {
            console.log('code is', code)
            console.log('checking code');
            const response = await confirm.confirm(code);
            // console.log(response);
        } catch (error) {
            console.log('Invalid code.');
            Alert.alert('Error', 'Invalid code. Please try again.');
        }
    }

    if (!confirm) {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={backgroundImage}
                    resizeMode="cover"
                    style={{ flex: 1, justifyContent: 'center', position: 'relative' }}
                />
                <View style={{ position: 'absolute', right: -40, top: -15 }}>
                    <Image source={headerImage} />
                </View>
                <View style={{ position: 'absolute', bottom: -85, left: -40 }}>
                    <Image source={headerImage} />
                </View>
                <View style={{ position: 'absolute', top: 150, padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', color: 'white' }}>
                        What’s your{"\n"}
                        Mobile Number?
                    </Text>
                    <Text style={{ fontSize: 10, fontWeight: '400', color: 'white', marginTop: 10 }}>
                        Rest assured, we prioritize your privacy. Your phone number{"\n"}is safe with us, and we will never disclose it to third parties
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 30, width: '100%' }}>
                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 6, justifyContent: 'center', marginRight: 17, height: 45 }} activeOpacity={1}>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                                IN +91
                            </Text>
                        </TouchableOpacity>
                        <View>
                            <TextInput
                                placeholder='Mobile Number'
                                style={{ backgroundColor: 'white', borderRadius: 6, paddingHorizontal: 16, width: 250, height: 45 }}
                                maxLength={10}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    text = text ? text?.replace(/[,.-]/g, '').replace(/^0+/, '') : '';
                                    setMobileNumber(text.trim());
                                    setError(prev => ({ ...prev, mobileNumber: (!text) }));
                                }}
                            />
                            {error.mobileNumber && <RenderError message='Enter Mobile Number' />}
                            {(mobileNumber && mobileNumber.length !== 10) && <RenderError message='Enter Valid Mobile Number' />}
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        paddingVertical: 15, width: '60%',
                        justifyContent: 'center', alignItems: 'center',
                        position: 'absolute', bottom: 85,
                        backgroundColor: disable ? '#C4C4C4' : '#6989CC',
                        alignSelf: 'center', borderRadius: 10                    }}
                    onPress={() => {
                        signInWithPhoneNumber('+91' + mobileNumber);
                        // navigation.navigate(LoginOTP);
                    }}
                    disabled={disable}
                >
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    else

        return (
            <>
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
                            Enter the code we’ve sent by text to +91 {mobileNumber}
                        </Text>
                        <View>
                            <OTPTextView
                                inputCount={6}
                                tintColor={'white'}
                                offTintColor={'black'}
                                keyboardType='numeric'
                                containerStyle={{height: 0, width: '100%' }}
                                textInputStyle={{color:'#fff'}}
                                handleTextChange={(text) => {
                                    setCode(text);
                                }}
                            />
                            {/* <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
                            <TouchableOpacity
                                style={{
                                    paddingVertical: 15,
                                    width: '60%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: OTPdisable ? '#C4C4C4' : '#6989CC',
                                    alignSelf: 'center',
                                    borderRadius: 10,
                                    top: 100
                                }}
                                onPress={() => {
                                    confirmCode();
                                }}
                                disabled={OTPdisable}
                            >
                                <Text style={otpStyles.continueText}>
                                    Continue
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </>

        );
}

export default LoginMobile;