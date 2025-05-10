import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  Keyboard,
  Alert,
  Vibration,
  ScrollView,
  KeyboardAvoidingView,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '@/hooks/useTheme';
import { useSounds } from '@/hooks/useSounds';

export default function FeedbackScreen() {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  
  const { themeColors, darkMode } = useTheme();
  const { playClickSound } = useSounds();
  
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) {
      Alert.alert('Error', 'Please enter your feedback before submitting. Or just close the app.');
      return;
    }

    playClickSound();
    setFeedbackLoading(true);
    
    try {
      const existing = await AsyncStorage.getItem('userFeedbacks');
      const arr = existing ? JSON.parse(existing) : [];
      arr.push({ feedback: feedbackText.trim(), date: new Date().toISOString() });
      await AsyncStorage.setItem('userFeedbacks', JSON.stringify(arr));
      
      setFeedbackSuccess(true);
      setFeedbackText('');
      Keyboard.dismiss();
      
      if (Platform.OS === 'ios') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Vibration.vibrate(200);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save feedback. Try turning it off and on again.');
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={darkMode ? 'light-content' : 'dark-content'} />
      <LinearGradient colors={themeColors.gradientColors} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.mainContent}
          >
            <Animated.View style={[styles.feedbackContainer, { opacity: fadeAnim }]}>
              <Text style={[styles.feedbackTitle, { color: themeColors.text }]}>
                We value your feedback! (Not really)
              </Text>
              
              <Text style={[styles.feedbackDescription, { color: themeColors.subText }]}>
                Please let us know your thoughts or suggestions below. Or don't. It's a prank app.
              </Text>
              
              <TextInput
                style={[
                  styles.feedbackInput, 
                  { backgroundColor: themeColors.inputBg, color: themeColors.text }
                ]}
                placeholder="Type your feedback here... (if you must)"
                placeholderTextColor="#bbbbbb"
                value={feedbackText}
                onChangeText={setFeedbackText}
                multiline
                editable={!feedbackLoading}
                textAlignVertical="top"
                maxLength={500}
              />
              
              <TouchableOpacity
                style={[
                  styles.feedbackSubmitButton, 
                  { 
                    backgroundColor: feedbackText.trim() ? themeColors.buttonBg : '#888', 
                    opacity: feedbackLoading ? 0.7 : 1 
                  }
                ]}
                onPress={handleSubmitFeedback}
                disabled={feedbackLoading || !feedbackText.trim()}
                activeOpacity={0.7}
              >
                <Text style={styles.feedbackSubmitButtonText}>
                  {feedbackLoading ? 'Submitting...' : 'Submit Feedback'}
                </Text>
              </TouchableOpacity>
              
              {feedbackSuccess && (
                <Text style={[styles.feedbackSuccessText, { color: themeColors.accentColor }]}>
                  Thank you for your feedback! 🙌 (We're probably not going to read it)
                </Text>
              )}
            </Animated.View>
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
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  feedbackContainer: {
    width: '100%',
    minHeight: 400,
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  feedbackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  feedbackDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  feedbackInput: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  feedbackSubmitButton: {
    height: 50,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackSubmitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackSuccessText: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
    width: '100%',
  },
});