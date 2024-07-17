import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import backgroundImage from '../../assets/splash-screen.png';
import headerImage from '../../assets/header-image.png';
import { RenderError } from '../Constants/Util';
import auth from '@react-native-firebase/auth';

const LoginMobile = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState({});
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const disable = mobileNumber.length != 10;

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function onAuthStateChanged(user) {
        if (user) {
            // User is signed in, navigate to the next screen or show a success message
            Alert.alert('Success', 'You have successfully logged in.');
            navigation.navigate('HomePage'); // Replace 'HomePage' with your target screen
        }
    }

    async function signInWithPhoneNumber(phoneNumber) {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            console.log('Error sending SMS:', error);
            Alert.alert('Error', 'Failed to send OTP. Please try again.');
        }
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
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
                        alignSelf: 'center', borderRadius: 10
                    }}
                    onPress={() => signInWithPhoneNumber('+91' + mobileNumber)}
                    disabled={disable}
                >
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <TextInput
                placeholder='Enter OTP'
                value={code}
                onChangeText={text => setCode(text)}
                style={{ backgroundColor: 'white', borderRadius: 6, paddingHorizontal: 16, height: 45, marginBottom: 20 }}
            />
            <TouchableOpacity
                style={{
                    paddingVertical: 15, width: '60%',
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: '#6989CC',
                    alignSelf: 'center', borderRadius: 10
                }}
                onPress={() => confirmCode()}
            >
                <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>
                    Confirm Code
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginMobile;