import { useState, useRef } from 'react';
import { Alert, Platform, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';

import { 
  roastingLines, 
  loadingMessages, 
  specialLocations 
} from '@/constants/weatherData';
import { 
  FakeWeatherData, 
  WeatherResult 
} from '@/types/weather';
import { useStorage } from './useStorage';

type SearchOptions = {
  onComplete?: () => void;
};

export const useWeatherFake = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WeatherResult | null>(null);
  const [fakeData, setFakeData] = useState<FakeWeatherData | null>(null);
  const [currentLoadingMsg, setCurrentLoadingMsg] = useState(loadingMessages[0]);
  
  const { usedRoasts, updatePrankCount, updateUsedRoasts } = useStorage();
  
  const loadingMsgInterval = useRef<NodeJS.Timeout | null>(null);

  const getRandomRoast = () => {
    const availableRoasts = roastingLines.filter(r => !usedRoasts.includes(r));
    if (availableRoasts.length === 0) {
      return roastingLines[Math.floor(Math.random() * roastingLines.length)];
    }
    const roast = availableRoasts[Math.floor(Math.random() * availableRoasts.length)];
    updateUsedRoasts(roast);
    return roast;
  };

  const generateFakeWeather = (locationName: string): FakeWeatherData => {
    const conditions = [
      'Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 
      'Thunderstorms', 'Windy', 'Clear', 'Foggy', 
      'Snowy', 'Apocalyptic', 'Bifrost', 'Quantum Realm'
    ];
    const temps = Math.floor(Math.random() * 40) + -5;
    const humidity = Math.floor(Math.random() * 100);
    const windSpeed = Math.floor(Math.random() * 60);
    const extraInfo = [
      '',
      'Expect strong winds and mild disappointment.',
      'Possible chance of meatballs.',
      'Bring an umbrella, or don\'t. We\'re not the boss of you.',
      'Weather conditions may vary wildly. Good luck.',
      'Consider staying indoors and questioning your life choices.',
      'You might want to build an ark.',
      'The end is nigh. (Weather-wise)',
      'Please consult a higher power for accurate forecast.',
      'Warning: This forecast may be completely fabricated.',
      'Watch out for falling debris.',
      'May cause temporary loss of sanity.',
      'You have my word, the weather will be... interesting.',
      'Brace for impact!',
      "It's about to get weird.",
    ];

    return {
      location: locationName,
      temperature: temps,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity,
      windSpeed,
      high: temps + Math.floor(Math.random() * 10),
      low: temps - Math.floor(Math.random() * 12),
      extra: extraInfo[Math.floor(Math.random() * extraInfo.length)],
    };
  };

  const handleSearch = (searchLocation: string, options?: SearchOptions) => {
    if (!searchLocation.trim()) {
      Alert.alert('Error', 'Please enter a location');
      return;
    }

    setLoading(true);
    setFakeData(null);
    setResult(null);
    
    let msgIndex = 0;
    if (loadingMsgInterval.current) {
      clearInterval(loadingMsgInterval.current);
    }
    
    loadingMsgInterval.current = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length;
      setCurrentLoadingMsg(loadingMessages[msgIndex]);
    }, 1500);
    
    const weatherData = generateFakeWeather(searchLocation);
    
    setTimeout(() => {
      if (loadingMsgInterval.current) {
        clearInterval(loadingMsgInterval.current);
        loadingMsgInterval.current = null;
      }
      
      setFakeData(weatherData);
      
      setTimeout(() => {
        setFakeData(null);
        setLoading(false);
        
        let message = `Weather forecast for ${searchLocation}: Go check outside!`;
        for (const [key, val] of Object.entries(specialLocations)) {
          if (searchLocation.toLowerCase().includes(key)) {
            message = `Weather forecast for ${searchLocation}: ${val}`;
            break;
          }
        }
        
        setResult({ 
          location: searchLocation, 
          message, 
          roast: getRandomRoast() 
        });
        
        if (Platform.OS === 'ios') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
          Vibration.vibrate(300);
        }
        
        updatePrankCount();
        
        if (options?.onComplete) {
          options.onComplete();
        }
      }, 2000);
    }, 4000);
  };

  return {
    location,
    setLocation,
    loading,
    setLoading,
    result,
    setResult,
    fakeData,
    setFakeData,
    currentLoadingMsg,
    handleSearch,
  };
};