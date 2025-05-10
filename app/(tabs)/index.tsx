import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import Header from '@/components/Header';
import WeatherSearch from '@/components/WeatherSearch';
import LoadingScreen from '@/components/LoadingScreen';
import FakeWeatherDisplay from '@/components/FakeWeatherDisplay';
import WeatherResult from '@/components/WeatherResult';
import WeatherFact from '@/components/WeatherFact';

import { useTheme } from '@/hooks/useTheme';
import { useSounds } from '@/hooks/useSounds';
import { useWeatherFake } from '@/hooks/useWeatherFake';
import { useStorage } from '@/hooks/useStorage';

const { width, height } = Dimensions.get('window');

export default function WeatherMischiefScreen() {
  const [location, setLocation] = useState('');
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  
  const { 
    fakeData, 
    loading, 
    result, 
    handleSearch, 
    currentLoadingMsg,
    setLoading, 
    setResult, 
    setFakeData 
  } = useWeatherFake();
  
  const { themeColors, darkMode, toggleDarkMode } = useTheme();
  const { playClickSound, playPrankSound } = useSounds();
  const { prankCount, showRealWeather } = useStorage();
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const rotateLogo = React.useRef(new Animated.Value(0)).current;
  const factFadeAnim = React.useRef(new Animated.Value(1)).current;
  const viewShotRef = React.useRef(null);

  const subtitles = [
    "Made with the help of Tony Stark (kinda)",
    "Your Friendly Neighborhood Weather Report",
    "Powered by Stark Industries (Not Really)",
    "The Weather App Loki Would Use",
    "Assembled in a cave! With a box of scraps!",
    "Bringing you the weather, whether you like it or no",
    "We predict the weather... poorly",
    "Even the Asgardians use this app to predict the weather",
  ];

  // Subtitle rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex(i => (i + 1) % subtitles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const runFadeInAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
    ]).start();
  };

  const spinLogo = () => {
    rotateLogo.setValue(0);
    Animated.timing(rotateLogo, { toValue: 2, duration: 2000, useNativeDriver: true }).start();
  };

  const spin = rotateLogo.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '360deg', '0deg'],
  });

  const onSubmitSearch = () => {
    if (!location.trim()) return;
    handleSearch(location, {
      onComplete: () => {
        runFadeInAnimation();
        spinLogo();
        playPrankSound();
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style={darkMode ? 'light-content' : 'dark-content'} />
      <LinearGradient colors={themeColors.gradientColors} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.mainContent}
          >
            <Header 
              subtitles={subtitles}
              currentSubtitleIndex={currentSubtitleIndex}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              spinValue={spin}
              playClickSound={playClickSound}
            />

            <WeatherSearch 
              location={location}
              setLocation={setLocation}
              onSubmit={onSubmitSearch}
              loading={loading}
              showRealWeather={showRealWeather}
              playClickSound={playClickSound}
            />

            {loading ? (
              <LoadingScreen currentLoadingMsg={currentLoadingMsg} />
            ) : fakeData ? (
              <FakeWeatherDisplay fakeData={fakeData} />
            ) : result ? (
              <WeatherResult 
                result={result} 
                fadeAnim={fadeAnim} 
                slideAnim={slideAnim} 
                scaleAnim={scaleAnim}
                viewShotRef={viewShotRef}
                playClickSound={playClickSound}
              />
            ) : null}

            <WeatherFact factFadeAnim={factFadeAnim} />
          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
});