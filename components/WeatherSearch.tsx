import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type WeatherSearchProps = {
  location: string;
  setLocation: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  showRealWeather: boolean;
  playClickSound: () => void;
};

const WeatherSearch = ({
  location,
  setLocation,
  onSubmit,
  loading,
  showRealWeather,
  playClickSound
}: WeatherSearchProps) => {
  const { themeColors } = useTheme();

  const handleRealWeather = () => {
    playClickSound();
    Alert.alert('Wait For It...', 'This is still a prank app! 😂\n\n Keep Pranking your friends 😉');
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={[
          styles.input, 
          { backgroundColor: themeColors.inputBg, color: themeColors.text }
        ]}
        placeholder="Enter a location..."
        placeholderTextColor="#bbb"
        value={location}
        onChangeText={setLocation}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        editable={!loading}
      />
      
      <TouchableOpacity
        style={[
          styles.searchButton, 
          { backgroundColor: themeColors.buttonBg }
        ]}
        onPress={onSubmit}
        activeOpacity={0.7}
        disabled={loading}
      >
        <Text style={styles.searchButtonText}>Get Forecast</Text>
      </TouchableOpacity>

      {showRealWeather && (
        <TouchableOpacity
          style={[
            styles.realWeatherButton, 
            { backgroundColor: themeColors.inputBg }
          ]}
          onPress={handleRealWeather}
          activeOpacity={0.7}
        >
          <Text 
            style={[
              styles.realWeatherButtonText, 
              { color: themeColors.text }
            ]}
          >
            Show Real Weather
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
    width: '100%',
  },
  searchButton: {
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  realWeatherButton: {
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  realWeatherButtonText: {
    fontSize: 16,
  },
});

export default WeatherSearch;