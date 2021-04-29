import React from 'react';
import {Dimensions, StyleSheet, ImageBackground} from 'react-native';

const Background = props => {
  const {children} = props;
  return (
    <ImageBackground
      style={[styles.backdrop]}
      source={require('../../assets/background.jpeg')}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    zIndex: -1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    flex: 1,
  },
});

export default Background;
