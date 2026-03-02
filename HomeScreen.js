import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const verses = [
  "በመጀመሪያ ቃል ነበረ...", 
  "እግዚአብሔር ብርሃኔና መድኃኒቴ ነው...",
  "ሁሉን በሚያበረታኝ በክርስቶስ ሁሉን እችላለሁ።"
];

export default function HomeScreen() {
  const width = Dimensions.get('window').width;
  const [dailyVerse, setVerse] = useState("");

  useEffect(() => {
    const day = new Date().getDate() % verses.length;
    setVerse(verses[day]);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Bible Verse Popup Area */}
      <View style={{ padding: 20, backgroundColor: '#eee' }}>        <Text style={{ fontWeight: 'bold' }}>የዕለቱ ጥቅስ:</Text>
        <Text style={{ fontStyle: 'italic' }}>{dailyVerse}</Text>
      </View>

      {/* Auto Sliding Images */}
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[{ title: 'Slider 1', img: 'url1' }, { title: 'Slider 2', img: 'url2' }]}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image source={{ uri: item.img }} style={{ width: '100%', height: '100%' }} />
            <Text style={{ position: 'absolute', bottom: 10, color: '#fff' }}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}