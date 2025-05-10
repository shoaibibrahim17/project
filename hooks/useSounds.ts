import { useRef, useEffect } from 'react';
import { Audio } from 'expo-av';

export const useSounds = () => {
  const prankSoundRef = useRef<Audio.Sound | null>(null);
  const clickSoundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    async function loadSounds() {
      try {
        const { sound: prankSound } = await Audio.Sound.createAsync(require('@/assets/prank-sound.wav'));
        prankSoundRef.current = prankSound;
        
        const { sound: clickSound } = await Audio.Sound.createAsync(require('@/assets/click.mp3'));
        clickSoundRef.current = clickSound;
      } catch (error) {
        console.log('Error loading sounds', error);
      }
    }
    
    loadSounds();

    return () => {
      prankSoundRef.current?.unloadAsync();
      clickSoundRef.current?.unloadAsync();
    };
  }, []);

  const playClickSound = async () => {
    try { 
      await clickSoundRef.current?.replayAsync(); 
    } catch (error) {
      console.log('Error playing click sound', error);
    }
  };

  const playPrankSound = async () => {
    try { 
      await prankSoundRef.current?.replayAsync(); 
    } catch (error) {
      console.log('Error playing prank sound', error);
    }
  };

  return {
    playClickSound,
    playPrankSound,
  };
};