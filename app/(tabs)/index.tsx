import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Linking, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useFonts, NotoSans_400Regular, NotoSans_600SemiBold } from '@expo-google-fonts/noto-sans';
import { TiltWarp_400Regular } from '@expo-google-fonts/tilt-warp';

interface SnippetItem {
  title: string;
  onPress: () => void;
  isSpecial?: boolean;
  specialText?: string;
}

const snippetItems: SnippetItem[] = [
  {
    title: 'Calendar',
    onPress: () => Linking.openURL('https://google.com'),
    isSpecial: true,
    specialText: 'You can book a 30-minute call with me here calendly.com/wisprflow'
  },
  {
    title: 'Hours',
    onPress: () => console.log('Hours pressed')
  },
  {
    title: 'Support intro',
    onPress: () => console.log('Support intro pressed')
  },
  {
    title: 'FAQ',
    onPress: () => console.log('FAQ pressed')
  },
  {
    title: 'Careers link',
    onPress: () => console.log('Careers link pressed')
  },
  {
    title: 'Elevator pitch',
    onPress: () => console.log('Elevator pitch pressed')
  }
];

export default function HomeScreen() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
    TiltWarp_400Regular,
  });

  // Force dark theme to match the design / Yay
  const isDark = true;
  
  if (!fontsLoaded) {
    return null; // or a loading spinner
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#2C2C2C' }]}>
      <ThemedView style={styles.header}>
        <Text style={styles.title}>Your Snippets</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add pressed')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </ThemedView>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {snippetItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={item.onPress} activeOpacity={0.7}>
            <ThemedView style={styles.snippetCard}>
              <Text style={styles.snippetTitle}>{item.title}</Text>
            </ThemedView>
            
            {item.isSpecial && item.specialText && (
              <ThemedView style={styles.specialCallout}>
                <ThemedView style={styles.arrow} />
                <Text style={styles.specialText}>{item.specialText}</Text>
              </ThemedView>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'TiltWarp_400Regular',
    color: '#FFFFFF',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  snippetCard: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    backgroundColor: 'transparent',
    borderColor: '#666',
  },
  snippetTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#FFFFFF',
  },
  specialCallout: {
    backgroundColor: '#FF9500',
    borderRadius: 12,
    padding: 16,
    marginTop: -8,
    marginBottom: 16,
    marginLeft: 40,
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    top: -8,
    left: 20,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF9500',
  },
  specialText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'NotoSans_400Regular',
    lineHeight: 22,
  },
});
