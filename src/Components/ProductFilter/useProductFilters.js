import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../Context/ApiContext';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

const BASE_URL = 'https://accounts-1.onrender.com';
const shapeFilters = [ { id: 'rectangle', title: 'Rectangle' }, { id: 'round', title: 'Round' }, { id: 'square', title: 'Square' } ];

export const useProductFilters = () => {
    const { getProductsData, AddToCart, Removefromcart, GetCartData } = useApi();
    const isFocused = useIsFocused();

    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartMap, setCartMap] = useState({});
    const [likedItems, setLikedItems] = useState({});

    // Filter states
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedShape, setSelectedShape] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);

    const fetchCartState = useCallback(async () => {
        try {
            const cartRes = await GetCartData();
            if (cartRes && !cartRes.error && Array.isArray(cartRes)) {
                const newCartMap = cartRes.reduce((acc, item) => {
                    const pId = item.product?.id || item.product_id;
                    if (pId) acc[pId] = item.id;
                    return acc;
                }, {});
                setCartMap(newCartMap);
            }
        } catch (e) {
            console.error("Failed to refresh cart state:", e);
        }
    }, [GetCartData]);

    const fetchPageData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const productsRes = await getProductsData();
            if (productsRes && Array.isArray(productsRes)) {
                const formatted = productsRes.map((p, index) => ({
                    id: p.id,
                    brand: p.brand_name.replace(/['"]/g, ''),
                    name: p.product_name.replace(/['"]/g, ''),
                    image: (p.images?.[0]?.image) ? `${BASE_URL}${p.images[0].image}` : 'https://via.placeholder.com/150',
                    price: parseFloat(p.price),
                    originalPrice: parseFloat(p.originalPrice || p.price * 1.4),
                    rating: p.rating || 4.5,
                    gender: index % 3 === 0 ? 'men' : index % 3 === 1 ? 'women' : 'kids',
                    shape: shapeFilters[index % shapeFilters.length].id,
                }));
                setAllProducts(formatted);
            } else {
                setError('No products found.');
            }
            await fetchCartState();
        } catch (err) {
            setError('Could not load data. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [getProductsData, fetchCartState]);

    useEffect(() => {
        if (isFocused) {
            fetchPageData();
        }
    }, [isFocused, fetchPageData]);

    const handleAddToCart = async (product) => {
        try {
            const res = await AddToCart({ product_id: product.id, quantity: 1 });
            setCartMap(prev => ({ ...prev, [res.product_id]: res.id }));
            showMessage({ message: 'Added to Cart', type: 'success' });
        } catch (err) {
            showMessage({ message: 'Error adding item', type: 'danger' });
            if (err.response?.status === 400) fetchCartState();
        }
    };

    const handleRemoveFromCart = async (product) => {
        const cartItemId = cartMap[product.id];
        if (!cartItemId) return;
        try {
            await Removefromcart(cartItemId);
            setCartMap(prev => {
                const newMap = { ...prev };
                delete newMap[product.id];
                return newMap;
            });
            showMessage({ message: 'Removed From Cart', type: 'success' });
        } catch (err) {
            showMessage({ message: 'Error removing item', type: 'danger' });
        }
    };

    const toggleLike = (itemId) => {
        setLikedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
    };

    const clearFilters = () => {
        setSelectedGender(null);
        setSelectedShape(null);
        setSelectedPrice(null);
    };

    const filteredProducts = allProducts.filter(product => {
        const genderMatch = !selectedGender || product.gender === selectedGender;
        const shapeMatch = !selectedShape || product.shape === selectedShape;
        const priceMatch = !selectedPrice ||
            (selectedPrice === 'p1' && product.price < 500) ||
            (selectedPrice === 'p2' && product.price >= 500 && product.price <= 999) ||
            (selectedPrice === 'p3' && product.price >= 1000 && product.price <= 1499);
        return genderMatch && shapeMatch && priceMatch;
    });

    return {
        loading,
        error,
        filteredProducts,
        cartMap,
        likedItems,
        filters: { selectedGender, selectedShape, selectedPrice },
        actions: {
            handleAddToCart,
            handleRemoveFromCart,
            toggleLike,
            clearFilters,
            setSelectedGender,
            setSelectedShape,
            setSelectedPrice,
        },
    };
};