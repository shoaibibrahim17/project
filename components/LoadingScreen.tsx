import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type LoadingScreenProps = {
  currentLoadingMsg: string;
};

const LoadingScreen = ({ currentLoadingMsg }: LoadingScreenProps) => {
  const { themeColors } = useTheme();

  return (
    <View style={styles.loadingContainer}>
      <Image 
        source={require('@/assets/loading-weather.gif')} 
        style={styles.loadingImage} 
      />
      <Text style={[styles.loadingText, { color: themeColors.text }]}>
        {currentLoadingMsg}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  loadingImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoadingScreen;