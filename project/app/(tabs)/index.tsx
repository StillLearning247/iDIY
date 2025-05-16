import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text as RNText } from 'react-native';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/Button';
import { SearchSuggestions } from '@/components/ui/SearchSuggestions';
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

  const trie = new Trie(5);

  useEffect(() => {
    // Initialize the trie with dictionary data
    trie.buildFromDictionary(dictionary);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }
    setError('');
    setIsLoading(true);
    console.log('Searching for:', searchQuery);
    
    // Simulate async search operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    if (searchQuery) {
      const suggestions = trie.getSuggestions(searchQuery);
      setSuggestions(suggestions);
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
  },
  logo: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  searchBar: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    marginBottom: 20,
  },
  suggestions: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    marginTop: 16,
  },
  logoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
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