import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate} from 'react-router-native';

// Importación de componentes
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignInContainer from './SigIn';


const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View>
      <View>
        <AppBar />
      </View>
      <View style={styles.container}>
        <Routes>
          <Route  path='/' element = {<RepositoryList />}/>
          <Route  path='/SignIn' element = {<SignInContainer />}/>
          <Route  path='*' element = {<Navigate to = '/' replace/>}/>
        </Routes>
      </View>
    </View>
  );
};

export default Main;