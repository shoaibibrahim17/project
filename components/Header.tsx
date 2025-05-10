import React from 'react';
import { View, Text, Image, StyleSheet, Switch, Animated } from 'react-native';

type HeaderProps = {
  subtitles: string[];
  currentSubtitleIndex: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
  spinValue: Animated.AnimatedInterpolation<string>;
  playClickSound: () => void;
};

const Header = ({ 
  subtitles, 
  currentSubtitleIndex, 
  darkMode, 
  toggleDarkMode, 
  spinValue,
  playClickSound 
}: HeaderProps) => {
  const themeColors = darkMode ? {
    text: '#fff',
    subText: '#e0e0e0',
  } : {
    text: '#fff',
    subText: '#e0e0e0',
  };

  return (
    <View style={styles.header}>
      <View style={styles.darkModeContainer}>
        <Text style={[styles.darkModeText, { color: themeColors.text }]}>
          {darkMode ? '🌙' : '☀️'}
        </Text>
        <Switch
          value={darkMode}
          onValueChange={() => {
            playClickSound();
            toggleDarkMode();
          }}
          trackColor={{ false: '#767577', true: '#4c669f' }}
          thumbColor={darkMode ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          style={styles.darkModeSwitch}
        />
      </View>
      
      <Animated.View style={{ transform: [{ rotate: spinValue }] }}>
        <Image
          source={darkMode ? require('@/assets/logo-dark.png') : require('@/assets/logo.png')}
          style={styles.logo}
        />
      </Animated.View>
      
      <Text style={[styles.title, { color: themeColors.text }]}>SkyC⚡st</Text>
      
      <Text style={[styles.subtitle, { color: themeColors.subText }]}>
        {subtitles[currentSubtitleIndex]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    position: 'relative',
    width: '100%',
  },
  darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -30,
    right: 0,
  },
  darkModeText: {
    fontSize: 18,
    marginRight: 5,
  },
  darkModeSwitch: {
    transform: [{ scale: 0.8 }],
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    width: '100%',
  },
});

export default Header;