import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = () => {
  const [prankCount, setPrankCount] = useState(0);
  const [showRealWeather, setShowRealWeather] = useState(false);
  const [usedRoasts, setUsedRoasts] = useState<string[]>([]);

  useEffect(() => {
    async function loadStorage() {
      try {
        const count = await AsyncStorage.getItem('prankCount');
        if (count !== null) {
          const countNum = parseInt(count, 10);
          setPrankCount(countNum);
          setShowRealWeather(countNum >= 1);
        }
        
        const savedRoasts = await AsyncStorage.getItem('usedRoasts');
        if (savedRoasts) {
          setUsedRoasts(JSON.parse(savedRoasts));
        }
      } catch (error) {
        console.log('Error loading saved data', error);
      }
    }
    
    loadStorage();
  }, []);

  const updatePrankCount = async () => {
    try {
      const newCount = prankCount + 1;
      await AsyncStorage.setItem('prankCount', newCount.toString());
      setPrankCount(newCount);
      if (newCount >= 1) {
        setShowRealWeather(true);
      }
    } catch (error) {
      console.log('Failed to update prank count', error);
    }
  };

  const updateUsedRoasts = (roast: string) => {
    const newUsedRoasts = [...usedRoasts, roast];
    setUsedRoasts(newUsedRoasts);
    AsyncStorage.setItem('usedRoasts', JSON.stringify(newUsedRoasts)).catch(console.error);
  };

  return {
    prankCount,
    showRealWeather,
    usedRoasts,
    updatePrankCount,
    updateUsedRoasts,
  };
};