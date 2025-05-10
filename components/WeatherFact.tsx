import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { weatherFacts } from '@/constants/weatherData';

type WeatherFactProps = {
  factFadeAnim: Animated.Value;
};

const WeatherFact = ({ factFadeAnim }: WeatherFactProps) => {
  const [weatherFact, setWeatherFact] = useState<string | null>(null);
  const { themeColors } = useTheme();

  const getRandomWeatherFact = () => {
    return weatherFacts[Math.floor(Math.random() * weatherFacts.length)];
  };

  useEffect(() => {
    setWeatherFact(getRandomWeatherFact());
    
    const factInterval = setInterval(() => {
      Animated.sequence([
        Animated.timing(factFadeAnim, { 
          toValue: 0, 
          duration: 500, 
          useNativeDriver: true 
        }),
        Animated.timing(factFadeAnim, { 
          toValue: 1, 
          duration: 500, 
          useNativeDriver: true 
        }),
      ]).start(() => setWeatherFact(getRandomWeatherFact()));
    }, 8000);

    return () => clearInterval(factInterval);
  }, []);

  if (!weatherFact) return null;

  return (
    <Animated.View
      style={[
        styles.weatherFactContainer, 
        { 
          backgroundColor: themeColors.factBg, 
          opacity: factFadeAnim 
        }
      ]}
    >
      <Text 
        style={[
          styles.weatherFactText, 
          { color: themeColors.text }
        ]}
      >
        {weatherFact}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  weatherFactContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  weatherFactText: {
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic',
    width: '100%',
  },
});

export default WeatherFact;