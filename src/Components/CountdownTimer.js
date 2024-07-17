import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountdownTimer = ({ containerStyle, textStyle, numberStyle, boxStyle }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15); // Set the target date 15 days from now
    const difference = targetDate - new Date();
    return difference > 0 ? difference : 0;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => (prevTimeLeft > 0 ? prevTimeLeft - 1000 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <View style={containerStyle}>
        <View style={boxStyle}>
            <Text style={numberStyle}>
                {days}
            </Text>
            <Text style={textStyle}>
                Days
            </Text>
        </View>
        <View style={boxStyle}>
            <Text style={numberStyle}>
                {hours}
            </Text>
            <Text style={textStyle}>
                Hours
            </Text>
        </View>
        <View style={boxStyle}>
            <Text style={numberStyle}>
                {minutes}
            </Text>
            <Text style={textStyle}>
                Minutes
            </Text>
        </View>
        <View style={boxStyle}>
            <Text style={numberStyle}>
                {seconds}
            </Text>
            <Text style={textStyle}>
                Seconds
            </Text>
        </View>
    </View>
  );
};

export default CountdownTimer;