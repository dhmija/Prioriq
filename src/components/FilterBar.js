import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTodo } from '../context/TodoContext';
import { CATEGORIES } from '../utils/constants';
import { typography } from '../theme/typography';

const FilterBar = () => {
  const { theme } = useTheme();
  const { filterStatus, setFilterStatus, filterCategory, setFilterCategory } = useTodo();

  const renderFilterButton = (label, isActive, onPress) => (
    <TouchableOpacity
      key={label}
      style={[
        styles.filterButton,
        {
          backgroundColor: isActive ? theme.primary : theme.surfaceHighlight,
          borderColor: isActive ? theme.primary : theme.border,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          typography.caption,
          { color: isActive ? '#FFF' : theme.textSecondary },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {renderFilterButton('All', filterStatus === 'All', () => setFilterStatus('All'))}
      {renderFilterButton('Active', filterStatus === 'Active', () => setFilterStatus('Active'))}
      {renderFilterButton('Completed', filterStatus === 'Completed', () => setFilterStatus('Completed'))}
      
      <Text style={[styles.divider, { color: theme.border }]}>|</Text>

      {CATEGORIES.map((cat) =>
        renderFilterButton(cat, filterCategory === cat, () =>
          setFilterCategory(filterCategory === cat ? 'All' : cat)
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent', // controlled by parent typically, or keep here
  },
  contentContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  divider: {
    marginRight: 10,
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default FilterBar;
