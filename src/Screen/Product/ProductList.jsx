 
 import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View } from 'react-native';
import colors from '../../styles/colors'; 
import { scale, verticalScale } from '../../styles/styleconfig'; 

import useProductDetails from '../../Components/ProductListGet/useProductDetails';
import ProductDetailsLoading from '../../Components/ProductListGet/ProductDetailsLoading';
import ProductDetailsEmpty from '../../Components/ProductListGet/ProductDetailsEmpty';
import ProductDetailsHeader from '../../Components/ProductListGet/ProductDetailsHeader';
import ImageSlider from '../../Components/ProductListGet/ImageSlider';
import ProductInfo from '../../Components/ProductListGet/ProductInfo';
import QuantitySelector from '../../Components/ProductListGet/QuantitySelector';
import ProductDescription from '../../Components/ProductListGet/ProductDescription';
import ProductActions from '../../Components/ProductListGet/ProductActions';

const ProductList = ({ route, navigation }) => {
 const { productId } = route.params;

  const {
    loading,
    productData,
    isUpdatingCart,
    isInCart,
    isOutOfStock,
    quantity,
    like,
    actions,
  } = useProductDetails(productId);

  if (loading) {
    return <ProductDetailsLoading />;
  }
  if (!productData) {
    return <ProductDetailsEmpty />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ProductDetailsHeader
        brand={productData.brand}
        like={like}
        onToggleLike={actions.toggleLike}
        onGoBack={() => navigation.goBack()}
        onGoToCart={() => navigation.navigate('Cart')}
      />
      <ScrollView>
        <ImageSlider images={productData.images} />
        <View style={styles.contentWrapper}>
          <ProductInfo product={productData} />
          <QuantitySelector
            quantity={quantity}
            stock={productData.stock}
            onIncrement={actions.incrementQuantity}
            onDecrement={actions.decrementQuantity}
          />
          <ProductDescription
            description={productData.description}
            specifications={productData.specifications}
          />
        </View>
      </ScrollView>
      <ProductActions
        isInCart={isInCart}
        isUpdatingCart={isUpdatingCart}
        isOutOfStock={isOutOfStock}
        onAddToCart={actions.handleAddToCart}
        onRemoveFromCart={actions.handleRemoveFromCart}
        onBuyNow={() => navigation.navigate('Cart', { product: productData })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentWrapper: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
    backgroundColor: colors.background,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    marginTop: verticalScale(-20),
  },
});


export default ProductList;