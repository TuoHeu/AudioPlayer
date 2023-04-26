import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  usePlaybackState,
  State as PlayerState,
} from 'react-native-track-player';
import audioAssets from '../assets/audioAssets';

const AudioPlayerScreen = ({route, navigation}) => {
  // Declare necessary state variables
  const [tracks, setTracks] = useState([]);
  const playbackState = usePlaybackState();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch tracks from the server
  useEffect(() => {
    setupPlayer();
    fetch(`http://localhost:3000/tracks/${route.params?.mentalState}`)
      .then(response => response.json())
      .then(data => {
        const newData = data.tracks.map(item => ({
          ...item,
          url: audioAssets[item.url],
        }));
        setTracks(newData);
      });
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
  };
  const setupTrack = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
  }
  // Handle play/pause
  const togglePlay = async () => {
    if (playbackState === PlayerState.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle track skip
  const skipTrack = async () => {
    if (currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
      await TrackPlayer.skip(tracks[currentIndex + 1].id);
      await TrackPlayer.play();
    }
  };

  // Initialize and destroy the player
  useEffect(() => {
    if (tracks.length > 0) {
      setupTrack();
      return async () => {
        await TrackPlayer.reset();
      };
    }
  }, [tracks]);

  return (
    <View style={styles.container}>
      <Text style={styles.state}>
        {route.params?.mentalState.toUpperCase()}
      </Text>
      <Text style={styles.trackName}>{tracks[currentIndex]?.name}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlay}>
          <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipTrack}>
          <Icon name="skip-next" size={50} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  state: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  trackName: {
    fontSize: 18,
    marginTop: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  back: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 30,
  },
});

export default AudioPlayerScreen;
