import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../theme/typography';

const Header = ({ title, showStats, onToggleStats }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingTop: insets.top + 20,
          borderBottomColor: theme.border,
        },
      ]}
    >
      <Text style={[styles.title, typography.h1, { color: theme.text }]}>
        {title}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton} onPress={onToggleStats}>
          <Feather name={showStats ? 'pie-chart' : 'bar-chart-2'} size={24} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
          <Feather name={isDarkMode ? 'sun' : 'moon'} size={24} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default Header;
