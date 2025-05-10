import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Share, Alert, Animated } from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import { useTheme } from '@/hooks/useTheme';
import { WeatherResult as WeatherResultType } from '@/types/weather';

type WeatherResultProps = {
  result: WeatherResultType;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  scaleAnim: Animated.Value;
  viewShotRef: React.RefObject<ViewShot>;
  playClickSound: () => void;
};

const WeatherResult = ({
  result,
  fadeAnim,
  slideAnim,
  scaleAnim,
  viewShotRef,
  playClickSound
}: WeatherResultProps) => {
  const { themeColors } = useTheme();

  const captureAndShareScreenshot = async () => {
    try {
      playClickSound();
      if (!viewShotRef.current) return;
      const uri = await viewShotRef.current.capture();
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { 
          mimeType: 'image/png', 
          dialogTitle: 'Share this weather prank!', 
          UTI: 'public.png' 
        });
      } else {
        Alert.alert('Error', 'Sharing is not supported on this device');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to share screenshot');
    }
  };

  const onShare = async () => {
    try {
      playClickSound();
      await Share.share({
        message: `Get pranked by SkyC⚡st! I just got bamboozled checking the weather for ${result?.location || ''}! Try it!`,
      });
    } catch {
      Alert.alert('Error', 'Unable to share');
    }
  };

  return (
    <ViewShot 
      ref={viewShotRef} 
      options={{ format: 'png', quality: 0.9 }} 
      style={styles.viewShotContainer}
    >
      <Animated.View 
        style={[
          styles.resultContainer, 
          { 
            opacity: fadeAnim, 
            transform: [
              { translateY: slideAnim }, 
              { scale: scaleAnim }
            ] 
          }
        ]}
      >
        <View 
          style={[
            styles.weatherCard, 
            { backgroundColor: themeColors.cardBg }
          ]}
        >
          <Text 
            style={[
              styles.locationText, 
              { color: themeColors.text }
            ]}
          >
            {result.location}
          </Text>
          
          <Image 
            source={require('@/assets/laugh-emoji.png')} 
            style={styles.weatherIcon} 
          />
          
          <Text 
            style={[
              styles.weatherMessage, 
              { color: themeColors.text }
            ]}
          >
            {result.message}
          </Text>
          
          <Text 
            style={[
              styles.roastText, 
              { color: themeColors.accentColor }
            ]}
          >
            {result.roast}
          </Text>
          
          <Text 
            style={[
              styles.nameSign, 
              { color: themeColors.accentColor }
            ]}
          >
            - Sk Ibrahim
          </Text>
          
          <View style={styles.shareButtonContainer}>
            <TouchableOpacity 
              style={[
                styles.shareButton, 
                { backgroundColor: themeColors.buttonBg }
              ]} 
              onPress={onShare} 
              activeOpacity={0.7}
            >
              <Text style={styles.shareButtonText}>Share Prank</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.screenshotButton, 
                { backgroundColor: themeColors.buttonBg }
              ]} 
              onPress={captureAndShareScreenshot} 
              activeOpacity={0.7}
            >
              <Text style={styles.shareButtonText}>Share Screenshot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ViewShot>
  );
};

const styles = StyleSheet.create({
  viewShotContainer: {
    width: '100%',
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  weatherCard: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    width: '100%',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  weatherMessage: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
    width: '100%',
  },
  roastText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 5,
    width: '100%',
  },
  nameSign: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
  },
  shareButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  shareButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  screenshotButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WeatherResult;