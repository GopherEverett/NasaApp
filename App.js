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
  Modal,
  Image,
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
        <StatusBar barStyle="light-content" />
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
                </View>
                <View style={styles.ImageContainer}>
                  <Image
                    style={styles.imageStyle}
                    source={{ uri: this.state.astronomy.hdurl }} />
                </View>
                <Text style={styles.sectionDescription}>
                  {this.state.astronomy.explanation}
                </Text>
                <Text style={styles.copyDate}>
                  {this.state.astronomy.date}
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
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: 'white',
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
  },
  copyDate: {
    color: 'white',
    textAlign: 'center',
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
