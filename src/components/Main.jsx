import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate} from 'react-router-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Importación de componentes
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignInContainer from './SigIn';
import UniqueRepository from './uniqueRepository/UniqueRepository';

import CreateReview from './formReview/CreateReview';
import Register from './user/Register';
import ReviewsUser from './user/ReviewsUser';

const styles = StyleSheet.create({
  containerContent: {
    marginHorizontal: 10,
    backgroundColor: '#e1e4e8',
    flex: 1,
  },

  containerAppBar : {
    marginHorizontal: 1
  }
});

const Main = () => {

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView  style={{ flex: 1}}>
      <View style = {styles.containerAppBar}>
        <AppBar />
      </View>
      <View style={styles.containerContent}>
        <Routes>
          <Route  path='/' element = {<RepositoryList />}/>
          <Route  path='/SignIn' element = {<SignInContainer />}/>
          <Route  path='*' element = {<Navigate to = '/' replace/>}/>
          <Route  path='/repository/:id' element = {<UniqueRepository />}/>
          <Route  path='/createReview' element = {<CreateReview />}/>
          <Route  path='/register' element = {<Register />} />
          <Route  path='/myReviews' element = {<ReviewsUser />} />
        </Routes>
      </View>
    </SafeAreaView>
  );
};

export default Main;