import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedDark = await AsyncStorage.getItem('darkMode');
        if (savedDark) {
          setDarkMode(JSON.parse(savedDark));
        }
      } catch (error) {
        console.log('Error loading theme preference', error);
      }
    };

    loadThemePreference();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev;
      AsyncStorage.setItem('darkMode', JSON.stringify(newValue)).catch(console.error);
      return newValue;
    });
  };

  const getThemeColors = () => {
    if (darkMode) return {
      gradientColors: ['#1a237e', '#121858', '#0a0e33'],
      cardBg: 'rgba(30, 30, 50, 0.5)',
      text: '#fff',
      subText: '#e0e0e0',
      inputBg: 'rgba(60, 60, 80, 0.5)',
      buttonBg: '#bb4444',
      accentColor: '#ffcc00',
      factBg: 'rgba(30, 30, 50, 0.6)',
      tabActive: '#bb4444',
      tabInactive: '#555',
    };
    
    return {
      gradientColors: ['#4c669f', '#3b5998', '#192f6a'],
      cardBg: 'rgba(255, 255, 255, 0.15)',
      text: '#fff',
      subText: '#e0e0e0',
      inputBg: 'rgba(255, 255, 255, 0.2)',
      buttonBg: '#ff6b6b',
      accentColor: '#ffcc00',
      factBg: 'rgba(0, 0, 0, 0.2)',
      tabActive: '#ff6b6b',
      tabInactive: '#aaa',
    };
  };

  return {
    darkMode,
    toggleDarkMode,
    themeColors: getThemeColors(),
  };
};