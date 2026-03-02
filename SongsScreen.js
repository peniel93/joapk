import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Button, Alert } from 'react-native';
import * as Print from 'expo-print';
import Share from 'react-native-share';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SongsScreen() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadSongs();
  }, [search]);

  const loadSongs = async () => {
    try {
      const res = await axios.get(`http://YOUR_API/api/songs?q=${search}`);
      setSongs(res.data);
      await AsyncStorage.setItem('cached_songs', JSON.stringify(res.data));
    } catch (e) {
      const cached = await AsyncStorage.getItem('cached_songs');
      if (cached) setSongs(JSON.parse(cached));
    }
  };

  const printLyrics = async (item) => {
    await Print.printAsync({
      html: `<h1>${item.title}</h1><p>${item.lyrics}</p>`
    });
  };

  const shareSong = (item) => {
    Share.open({ message: `Check out this song: ${item.title}\n${item.lyrics}` });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput         placeholder="Search Amharic Lyrics..." 
        style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
        onChangeText={setSearch}
      />
      <FlatList
        data={songs}
        renderItem={({ item }) => (
          <View style={{ padding: 15, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.lyrics.substring(0, 100)}...</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Button title="Print" onPress={() => printLyrics(item)} />
              <Button title="Share" onPress={() => shareSong(item)} />
            </View>
          </View>
        )}
      />    </View>
  );
}