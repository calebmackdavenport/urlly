/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   StatusBar,
   useColorScheme
 } from 'react-native';
 
 import Background from './src/components/Background';
 import Home from './src/screens/Home';
 
 const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

   return (
     <Background>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <SafeAreaView style={{flex: 1}}>
         <Home />
       </SafeAreaView>
     </Background>
   );
 };
 
 export default App;