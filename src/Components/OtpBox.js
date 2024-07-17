import React, { useRef, useState, useEffect } from "react";
import { View, Pressable, TextInput, Text } from "react-native";

const OTPInput = ({ code, setCode, maximumLength, setIsPinReady }) => {
    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
    const boxArray = new Array(maximumLength).fill(0);
    const inputRef = useRef();

    useEffect(() => {
        setIsPinReady(code.length === maximumLength);
        return () => {
            setIsPinReady(false);
        };
    }, [code]);


    const boxDigit = (_, index) => {
        const emptyInput = "";
        const digit = code[index] || emptyInput;
        const isCurrentValue = index === code.length;
        const isLastValue = index === maximumLength - 1;
        const isCodeComplete = code.length === maximumLength;
        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);
        const flag = isInputBoxFocused && isValueFocused

        return (
            <View style={{
                marginTop: 7, borderRadius: 6,
                padding: 12, width: 52, height: 52,
                backgroundColor: flag ? 'grey' : 'white'
            }}
                key={index}>
                <Text style={{
                    fontSize: 20,
                    textAlign: 'center',
                    color: 'black'
                }}>{digit}</Text>
            </View >
        );
    };

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Pressable
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}
                onPress={() => {
                    setIsInputBoxFocused(true);
                    inputRef.current.focus();
                }}>
                {boxArray.map(boxDigit)}
            </Pressable>
            <TextInput
                style={{
                    position: 'absolute',
                    opacity: 0,
                }}
                value={code}
                onChangeText={(text) => {
                    text = text ? text?.replace(/[,.-]/g, '').replace(/^0+/, '') : ''
                    setCode(text.trim())
                }}
                maxLength={maximumLength}
                keyboardType="numeric"
                ref={inputRef}
                onBlur={() => setIsInputBoxFocused(false)}
            />
        </View >
    );
};

export default OTPInput;