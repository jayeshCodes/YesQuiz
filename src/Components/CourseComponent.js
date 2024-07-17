import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CourseComponent = ({ onPress, text, selected, disable }) => {
    return (
        <TouchableOpacity
            style={{
                paddingHorizontal: 12, paddingVertical: 14,
                backgroundColor: selected ? '#6A89CC' : 'white', borderRadius: 5,
                justifyContent: 'center', marginRight: 15
            }}
            onPress={onPress}
            disabled={disable}
        >
            <Text style={{ fontSize: 12, fontWeight: 400, color: selected ? 'white': 'black' }}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default CourseComponent