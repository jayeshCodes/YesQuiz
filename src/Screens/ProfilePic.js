import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ImageCropPicker from 'react-native-image-crop-picker'
import headerImage from '../../assets/header-image.png'
import Ionicon from 'react-native-vector-icons/Ionicons'

const ProfilePic = ({ navigation }) => {

    const [selectedImage, setSelectedImage] = useState('')
    const selectImage = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                cropperCircleOverlay: false,
                freeStyleCropEnabled: true,
                saveToPhotos: true
            })
            setSelectedImage(image.path)
        } catch (error) {
            ("Image Picker cannot be openned: ", error)
        }
    }
    const disable = selectedImage ? false : true
    return (
        <View style={{ flex: 1, backgroundColor: '#374259' }}>
            <Image source={headerImage} style={{ alignSelf: 'flex-end', position: 'absolute', right: -50, top: -25 }} />
            <TouchableOpacity
                style={{ flexDirection: 'row', marginLeft: 22, marginTop: 50, alignItems: 'center' }}
                onPress={() => navigation.navigate('HomePage')}
            >
                <Text style={{ fontSize: 16, fontWeight: 500, color: '#FFFFFF', marginRight: 5 }}>
                    Skip
                </Text>
                <Ionicon name='chevron-forward-outline' size={18} color='#FFFFFF' />
            </TouchableOpacity>

            <View style={{ marginTop: 80, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 500, color: '#FFFFFF', textAlign: 'center' }}>
                    Upload a profile picture
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ height: 125, width: 125, borderRadius: 62, borderWidth: 2, borderColor: '#FFFFFF', marginTop: 35, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}
                    onPress={selectImage}
                >
                    {
                        !selectedImage ?
                            <Ionicon name='add' size={40} color='#FFFFFF' />
                            :
                            <Image source={selectImage} style={{ height: 125, width: 125 }} />
                    }
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{
                    paddingVertical: 15, width: '60%',
                    justifyContent: 'center', alignItems: 'center',
                    position: 'absolute', bottom: 85,
                    backgroundColor: disable ? '#C4C4C4' : '#6989CC',
                    alignSelf: 'center', borderRadius: 10
                }}
                onPress={() => {
                    navigation.navigate('HomePage')
                }}
                disabled={disable}
            >
                <Text style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    )
}


export default ProfilePic