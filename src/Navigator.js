import { StatusBar, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Splash from './Screens/Splash'
import LoginMobile from './Screens/LoginMobile'
import LoginOTP from './Screens/LoginOTP'
import Login from './Screens/LoginDetails'
// import LoginConfirmation from './Screens/LoginConfirmation'
import HomePage from './Screens/HomePage'
import AllQuizes from './Screens/AllQuizes'
import QuizScreen from './Screens/QuizScreen'
import Leaderboard from './Screens/Leaderboard'
import { QuestionProvider } from './Constants/ApiContext'
import Result from './Screens/Result'
import ProfileScreen from './Screens/ProfileScreen'
// import ProfilePic from './Screens/ProfilePic'
import SignUp from './Screens/SignUp'
import NewLogin from './Screens/NewLogin'
import EnterEmail from './Screens/ForgotPassword/EnterEmail'
import ResetPassword from './Screens/ForgotPassword/ResetPassword'
import QuizReview from './Screens/QuizReview'
import PhoneSignIn from './Screens/PhoneAuth'

const Stack = createStackNavigator()

const Navigator = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <QuestionProvider>
                <NavigationContainer>
                    {/* <StatusBar backgroundColor='transparent' translucent={true} /> */}
                    <Stack.Navigator screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Screen name='Splash' component={Splash} />
                        <Stack.Screen name='LoginMobile' component={LoginMobile} />
                        <Stack.Screen name='LoginOTP' component={LoginOTP} />
                        <Stack.Screen name='Login' component={Login} />
                        {/* <Stack.Screen name='LoginConfirmation' component={LoginConfirmation} /> */}

                        <Stack.Screen name='HomePage' component={HomePage} />
                        <Stack.Screen name='AllQuizes' component={AllQuizes} />
                        <Stack.Screen name='QuizScreen' component={QuizScreen} />
                        <Stack.Screen name='QuizReview' component={QuizReview} headerMode="screen" />
                        <Stack.Screen name='Leaderboard' component={Leaderboard} />
                        <Stack.Screen name='Result' component={Result} />
                        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />

                        {/* <Stack.Screen name='ProfilePicture' component={ProfilePic} /> */}
                        <Stack.Screen name='SignUp' component={SignUp} />
                        <Stack.Screen name='NewLogin' component={NewLogin} />
                        <Stack.Screen name='EnterEmail' component={EnterEmail} />
                        <Stack.Screen name='ResetPassword' component={ResetPassword} />
                        <Stack.Screen name='PhoneSignIn' component={PhoneSignIn} />
                    </Stack.Navigator>
                </NavigationContainer>
            </QuestionProvider>
        </SafeAreaView>
    )
}

export default Navigator