import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { verticalScale } from '../../styles/styleconfig';
import Header from '../../Components/HomeComponents/Header';
import NewArrivals from '../../Components/HomeComponents/NewArrivals';
import AllCategories from '../../Components/HomeComponents/AllCategories';
import TrendingFramesSection from '../../Components/HomeComponents/TrendingFramesSection';
import FramesShapes from '../../Components/HomeComponents/FramesShapes';
import SearchResultsList from '../../Components/HomeComponents/SearchResultsList';
import { useApi } from '../../Context/ApiContext'; 
import { useNavigation } from '@react-navigation/native'; 

const HomeScreen = () => {
  const navigation = useNavigation();
  const { SearchProducts } = useApi();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);
      const response = await SearchProducts(searchQuery);
      if (response && !response.error) {
        setSearchResults(response);
      } else {
        setSearchResults([]);
        setSearchError(response.message || 'Search failed');
      }
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, SearchProducts]);

  const handleResultPress = (product) => {
    setSearchQuery('');
    setSearchResults([]);
    navigation.navigate('ProductList', { productId: product.id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={{ flex: 1 }}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <Header 
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
          <NewArrivals/>
          <AllCategories/>
          <TrendingFramesSection/>
          <FramesShapes/>
          <View style={{ height: verticalScale(20) }} />
        </ScrollView> 
        {searchQuery.length > 0 && (
            <SearchResultsList 
                results={searchResults}
                loading={isSearching}
                error={searchError}
                onResultPress={handleResultPress}
            />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;