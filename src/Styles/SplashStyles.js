import {StyleSheet} from 'react-native';

const splashStyles = StyleSheet.create({
mainContainer: {
flex: 1,
justifyContent: 'center',
},
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  getStartedButton: {
    paddingVertical: 15,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
    backgroundColor: '#6989CC',
    alignSelf: 'center',
    borderRadius: 10,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  logo: {
    width: "60%",
    height: "25%",
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export {splashStyles};
