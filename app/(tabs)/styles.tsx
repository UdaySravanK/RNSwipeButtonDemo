import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        },
        reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
  container: {padding: 5, paddingTop: 50, paddingBottom: 15},
  swipeStatus: {
    color: '#FF0000',
    fontSize: 15,
    paddingVertical: 3,
    marginVertical: 5,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 1,
    textAlign: 'center',
  },
  subHeading: {color: '#140866', fontSize: 15},
  title: {
    color: '#700D99',
    fontSize: 20,
    paddingBottom: 5,
    textAlign: 'center',
  },
  cell: {
    backgroundColor: '#93d2f9',
    borderColor: '#2284c0',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginBottom: 5, 
  },
  cell2: {
    backgroundColor: '#cfe89f',
    borderColor: '#5b860a',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginBottom: 5, 
  },
  scrollview: {
    backgroundColor: '#ffffff',
    marginVertical: 64,
    paddingHorizontal: 15
  },
  button: {
    backgroundColor: '#c0bab3',
    borderColor: '#5b860a',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    marginRight: 15,
  }
});

export default Styles;