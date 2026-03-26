import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../theme/colors';
import { SETTINGS_KEY } from '../utils/constants';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const settings = await AsyncStorage.getItem(SETTINGS_KEY);
      if (settings) {
        const parsed = JSON.parse(settings);
        setIsDarkMode(parsed.isDarkMode);
      } else {
        setIsDarkMode(systemColorScheme === 'dark');
      }
    } catch (e) {
      console.error('Failed to load theme settings', e);
      setIsDarkMode(systemColorScheme === 'dark');
    } finally {
      setIsLoaded(true);
    }
  };

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ isDarkMode: newMode }));
    } catch (e) {
      console.error('Failed to save theme settings', e);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  if (!isLoaded) return null;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
