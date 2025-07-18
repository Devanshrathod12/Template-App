import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';

const genderFilters = [{ id: 'men', title: 'Men' }, { id: 'women', title: 'Women' }, { id: 'kids', title: 'Kids' }];
const shapeFilters = [{ id: 'rectangle', title: 'Rectangle' }, { id: 'round', title: 'Round' }, { id: 'square', title: 'Square' }];
const priceFilters = [{ id: 'p1', title: 'Under ₹500' }, { id: 'p2', title: '₹500 – ₹999' }, { id: 'p3', title: '₹1000 – ₹1499' }];

const FilterSidebar = ({ isVisible, onClose, filters, actions }) => {
    const sidebarAnim = useRef(new Animated.Value(-300)).current;

    useEffect(() => {
        Animated.timing(sidebarAnim, {
            toValue: isVisible ? 0 : -300,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
                <View style={styles.sidebarHeader}>
                    <Text style={styles.sidebarTitle}>Filters</Text>
                    <TouchableOpacity onPress={onClose}><Icon name="x" size={24} color={colors.textDark} /></TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Gender Filter */}
                    <View style={styles.filterSection}>
                        <Text style={styles.sectionTitle}>Gender</Text>
                        <View style={styles.optionsContainer}>
                            {genderFilters.map(item => (
                                <TouchableOpacity key={item.id} style={[styles.filterOption, filters.selectedGender === item.id && styles.selectedOption]} onPress={() => actions.setSelectedGender(prev => prev === item.id ? null : item.id)}>
                                    <Text style={[styles.filterText, filters.selectedGender === item.id && styles.selectedText]}>{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    {/* Other filters similar to above */}
                    <View style={styles.filterSection}>
                        <Text style={styles.sectionTitle}>Frame Shape</Text>
                        <View style={styles.optionsContainer}>
                            {shapeFilters.map(item => (
                                <TouchableOpacity key={item.id} style={[styles.filterOption, filters.selectedShape === item.id && styles.selectedOption]} onPress={() => actions.setSelectedShape(prev => prev === item.id ? null : item.id)}>
                                    <Text style={[styles.filterText, filters.selectedShape === item.id && styles.selectedText]}>{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                     <View style={styles.filterSection}>
                        <Text style={styles.sectionTitle}>Price</Text>
                        <View style={styles.optionsContainer}>
                            {priceFilters.map(item => (
                                <TouchableOpacity key={item.id} style={[styles.filterOption, filters.selectedPrice === item.id && styles.selectedOption]} onPress={() => actions.setSelectedPrice(prev => prev === item.id ? null : item.id)}>
                                    <Text style={[styles.filterText, filters.selectedPrice === item.id && styles.selectedText]}>{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
                <View style={styles.sidebarFooter}>
                    <TouchableOpacity style={styles.clearButton} onPress={actions.clearFilters}><Text style={styles.clearButtonText}>Clear All</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.applyButton} onPress={onClose}><Text style={styles.applyButtonText}>Apply</Text></TouchableOpacity>
                </View>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.overlay, zIndex: 1 },
    sidebar: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 300, backgroundColor: colors.background, zIndex: 2, elevation: 10 },
    sidebarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
    sidebarTitle: { fontSize: 20, fontWeight: 'bold' },
    filterSection: { padding: 16, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
    sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
    optionsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    filterOption: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.borderFaded, backgroundColor: colors.backgroundFaded, margin: 5 },
    selectedOption: { backgroundColor: colors.primary, borderColor: colors.primary },
    filterText: { fontSize: 14, color: colors.textDark },
    selectedText: { color: colors.textLight, fontWeight: '500' },
    sidebarFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 10, borderTopWidth: 1, borderTopColor: colors.borderLight, backgroundColor: colors.background },
    clearButton: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#ccc', marginRight: 5 },
    clearButtonText: { color: colors.textDark, fontWeight: 'bold' },
    applyButton: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', backgroundColor: colors.primary, marginLeft: 5 },
    applyButtonText: { color: colors.textLight, fontWeight: 'bold' },
});

export default FilterSidebar;