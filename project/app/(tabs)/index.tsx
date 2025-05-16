import React, { useState, useEffect, useRef } from 'react'; // ✅ CHANGED: Added useRef
import { View, StyleSheet, Image, Text as RNText } from 'react-native';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/Button';
import { SearchSuggestions } from '@/components/ui/SearchSuggestions'; // ✅ Already imported
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useTheme } from '@/hooks/useTheme';
import { Search } from 'lucide-react-native';
import { Trie } from '@/utils/Trie';
import dictionary from '@/assets/dictionaries/diy_dictionary.json';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const trieRef = useRef(new Trie(5)); // ✅ CHANGED: Persist Trie instance

  useEffect(() => {
    trieRef.current.buildFromDictionary(dictionary); // ✅ CHANGED: Build only once
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
    // ✅ CHANGED: Replace only last word with selected suggestion
    const words = searchQuery.trim().split(' ');
    words[words.length - 1] = suggestion;
    setSearchQuery(words.join(' '));
    setSuggestions([]);
  };

  useEffect(() => {
    if (searchQuery) {
      const words = searchQuery.trim().split(' ');
      const lastWord = words[words.length - 1].toLowerCase();
      const found = trieRef.current.getSuggestions(lastWord); // ✅ CHANGED: Call Trie correctly
      setSuggestions(found);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <LoadingScreen visible={isLoading} />
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/iDIY_logo.jpg')}
          style={styles.logo}
        />
        <RNText style={styles.logoText}>iDIY</RNText>
      </View>

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

      <SearchSuggestions // ✅ ADDED: Render suggestion list
        suggestions={suggestions}
        onSelect={handleSelectSuggestion}
      />

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logoContainer: {
    marginBottom: 48,
    alignItems: 'center',
  },
  logo: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  logoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
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