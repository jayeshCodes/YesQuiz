import { Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const OptionsCard = ({ disabled, option, answer, onPress }) => {

    const value = answer
    const [optionSelect, setOptionSelect] = useState(false)
    const onPressOption = () => {
        setOptionSelect(true)
        onPress()
    }

    const optionColor = optionSelect ? (value ? '#C3EDBF' : 'red') : '#F2F2F2'
    return (
        <TouchableOpacity
            style={{ paddingVertical: 12, paddingLeft: 12, backgroundColor: optionColor, marginBottom: 15, borderRadius: 10 }}
            onPress={onPressOption}
            disabled={disabled}
        >
            <Text style={{ fontSize: 12, fontWeight: 500, color: '#42003F' }}>
                {option}
            </Text>
        </TouchableOpacity>
    )
}

export default OptionsCard