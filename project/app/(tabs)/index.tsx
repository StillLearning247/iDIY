import 'react-native-url-polyfill/auto'
import React, { useState, useEffect, useRef } from 'react'; // ✅ CHANGED: Added useRef
import { View, StyleSheet, Image, Text as RNText } from 'react-native';
import { SearchBar } from '@/components/ui/SearchBar.js';
import { Button } from '@/components/ui/Button.js';
import { SearchSuggestions } from '@/components/ui/SearchSuggestions.js'; // ✅ Already imported
import LoadingScreen from '@/components/ui/LoadingScreen.js';
import { useTheme } from '@/hooks/useTheme.js';
import { theme } from '@/theme.js';
import { Search } from 'lucide-react-native';
import { Trie } from '@/utils/Trie.js';
import dictionary from '@/assets/dictionaries/diy_dictionary.json';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const theme = useTheme();

  // Mock user data - replace with actual auth state
  useEffect(() => {
    // TODO: Replace with actual auth state check
    setUserEmail('user@example.com');
  }, []);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const trieRef = useRef(new Trie(5));

  useEffect(() => {
    trieRef.current.buildFromDictionary(dictionary);
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }
    setError('');
    setIsLoading(true);
    console.log('Searching for:', searchQuery);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    const words = searchQuery.trim().split(' ');
    words[words.length - 1] = suggestion;
    setSearchQuery(words.join(' '));
    setSuggestions([]);
  };

  useEffect(() => {
    if (searchQuery) {
      const words = searchQuery.trim().split(' ');
      const lastWord = words[words.length - 1].toLowerCase();
      const found = trieRef.current.getSuggestions(lastWord);
      setSuggestions(found);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <LoadingScreen visible={isLoading} />
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/iDIY_logo2.jpg')}
                style={styles.logo}
              />
            </View>

            <View style={styles.searchContainer}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onClear={() => {
                  setSearchQuery('');
                  setError('');
                  setSuggestions([]);
                }}
                placeholder="Search for DIY projects..."
                style={styles.searchBar}
              />
              {keyboardVisible && suggestions.length > 0 && (
                <SearchSuggestions
                  suggestions={suggestions}
                  onSelect={handleSelectSuggestion}
                />
              )}
            </View>

            {error && (
              <RNText style={styles.errorText}>{error}</RNText>
            )}

            <Button
              title="Search"
              variant="primary"
              style={[
                styles.searchButton,
                {
                  backgroundColor: theme.colors.secondary,
                  borderRadius: 12,
                  paddingVertical: 14,
                }
              ]}
              icon={<Search size={24} color="white" />}
              onPress={handleSearch}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {userEmail && (
        <View style={[styles.userContainer, { backgroundColor: theme.colors.background }]}>
          <RNText style={[styles.userText, { color: theme.colors.text }]}>
            Logged in as: {userEmail}
          </RNText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  userContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  userText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  logoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  searchBar: {
    width: '100%',
    marginBottom: 12,
  },
  errorText: {
    marginTop: 8,
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  searchButton: {
    marginTop: 24,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});