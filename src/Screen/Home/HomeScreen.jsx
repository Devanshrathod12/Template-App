import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { verticalScale } from '../../styles/styleconfig';
import Header from '../../Components/HomeComponents/Header';
import NewArrivals from '../../Components/HomeComponents/NewArrivals';
import AllCategories from '../../Components/HomeComponents/AllCategories';
import TrendingFramesSection from '../../Components/HomeComponents/TrendingFramesSection';
import FramesShapes from '../../Components/HomeComponents/FramesShapes';
const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
       <Header/>
       <NewArrivals/>
       <AllCategories/>
       <TrendingFramesSection/>
       <FramesShapes/>
        <View style={{ height: verticalScale(20) }} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
