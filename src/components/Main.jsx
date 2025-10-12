import React, { use } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate} from 'react-router-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Importación de componentes
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignInContainer from './SigIn';
import UniqueRepository from './uniqueRepository/UniqueRepository';

const styles = StyleSheet.create({
  containerContent: {
    marginLeft: 8,
    backgroundColor: '#e1e4e8',
    flex: 1,
  },
});

const Main = () => {

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: insets.bottom}}>
      <View>
        <AppBar />
      </View>
      <View style={styles.containerContent}>
        <Routes>
          <Route  path='/' element = {<RepositoryList />}/>
          <Route  path='/SignIn' element = {<SignInContainer />}/>
          <Route  path='*' element = {<Navigate to = '/' replace/>}/>
          <Route  path='/repository/:id' element = {<UniqueRepository />}/>
        </Routes>
      </View>
    </SafeAreaView>
  );
};

export default Main;