/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking,
  Image,
  TouchableHighlight,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';

import { REACT_APP_API_KEY } from 'react-native-dotenv';


class App extends Component {
  state = {
    astronomy: [],
  };

  componentDidMount() {
    const END_POINT = 'https://api.nasa.gov/planetary/apod?api_key=';
    axios
      .get(END_POINT + REACT_APP_API_KEY)
      .then(res => {
        this.setState({
          astronomy: res.data,
        });
      })
      .catch(err => {
        console.log(err, 'failed to fetch data');
      });
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.mainTitleContainer}>
                <Text style={styles.mainTitle}>NASA Image of the Day</Text>
              </View>
              <View style={styles.sectionContainer}>
                <View>
                  <Text style={styles.sectionTitle}>
                    {this.state.astronomy.title}
                  </Text>
                  <Text style={styles.sectionTitleParens}>(click image for HD version)</Text>
                </View>
                <View style={styles.ImageContainer}>
                  <TouchableHighlight
                    onPress={() => Linking.openURL(this.state.astronomy.hdurl)}>
                    <Image
                      style={styles.imageStyle}
                      source={{ uri: this.state.astronomy.url }}
                    />
                  </TouchableHighlight>
                </View>
                <Text style={styles.sectionDescription}>
                  {this.state.astronomy.explanation}
                </Text>
                <Text style={styles.copyDate}>
                  {this.state.astronomy.date}{' '}
                  {this.state.astronomy.copyright}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'black',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Futura',
  },
  sectionTitleParens: {
    fontSize: 20,
    fontWeight: '500',
    color: '#c8ebf7',
    textAlign: 'center',
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Futura',
    textShadowColor: '#c8ebf7',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  mainTitleContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  imageStyle: {
    width: 380,
    height: 300,
    borderRadius: 5,
    marginTop: 5,
  },
  copyDate: {
    color: 'white',
    textAlign: 'center',
    margin: 8,
    fontFamily: 'Futura',
  },
  highlight: {
    fontWeight: '700',
  },
  ImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
