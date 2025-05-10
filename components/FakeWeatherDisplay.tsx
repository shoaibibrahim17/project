import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { FakeWeatherData } from '@/types/weather';

type FakeWeatherDisplayProps = {
  fakeData: FakeWeatherData;
};

const FakeWeatherDisplay = ({ fakeData }: FakeWeatherDisplayProps) => {
  const { themeColors } = useTheme();

  const getWeatherIcon = () => {
    if (fakeData.condition.includes('Rain')) {
      return require('@/assets/rain-icon.png');
    } else if (fakeData.condition.includes('Cloud')) {
      return require('@/assets/cloudy-icon.png');
    } else if (fakeData.condition.includes('Sun')) {
      return require('@/assets/sun-icon.png');
    } else if (fakeData.condition.includes('Snow')) {
      return require('@/assets/snow-icon.png');
    } else if (fakeData.condition.includes('Thunder')) {
      return require('@/assets/thunder-icon.png');
    } else if (fakeData.condition.includes('Bifrost')) {
      return require('@/assets/bifrost-icon.png');
    } else if (fakeData.condition.includes('Quantum')) {
      return require('@/assets/quantum-icon.png');
    } else {
      return require('@/assets/wind-icon.png');
    }
  };

  return (
    <View style={styles.fakeDataContainer}>
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
          {fakeData.location}
        </Text>
        
        <View style={styles.mainWeatherRow}>
          <Image
            source={getWeatherIcon()}
            style={styles.weatherIcon}
          />
          <View>
            <Text 
              style={[
                styles.tempText, 
                { color: themeColors.text }
              ]}
            >
              {fakeData.temperature}°C
            </Text>
            <Text 
              style={[
                styles.conditionText, 
                { color: themeColors.subText }
              ]}
            >
              {fakeData.condition}
            </Text>
          </View>
        </View>
        
        {fakeData.extra ? (
          <Text 
            style={[
              styles.extraInfoText, 
              { color: themeColors.accentColor }
            ]}
          >
            {fakeData.extra}
          </Text>
        ) : null}
        
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text 
              style={[
                styles.detailLabel, 
                { color: themeColors.subText }
              ]}
            >
              HUMIDITY
            </Text>
            <Text 
              style={[
                styles.detailValue, 
                { color: themeColors.text }
              ]}
            >
              {fakeData.humidity}%
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text 
              style={[
                styles.detailLabel, 
                { color: themeColors.subText }
              ]}
            >
              WIND
            </Text>
            <Text 
              style={[
                styles.detailValue, 
                { color: themeColors.text }
              ]}
            >
              {fakeData.windSpeed} km/h
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text 
              style={[
                styles.detailLabel, 
                { color: themeColors.subText }
              ]}
            >
              HIGH/LOW
            </Text>
            <Text 
              style={[
                styles.detailValue, 
                { color: themeColors.text }
              ]}
            >
              {fakeData.high}°/{fakeData.low}°
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fakeDataContainer: {
    width: '100%',
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
  mainWeatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 15,
  },
  tempText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  conditionText: {
    fontSize: 20,
    width: '100%',
  },
  extraInfoText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 5,
    width: '100%',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
  },
});

export default FakeWeatherDisplay;