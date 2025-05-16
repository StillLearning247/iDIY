export class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  words: string[];

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.words = [];
  }
}

export class Trie {
  private root: TrieNode;
  private maxSuggestions: number;

  constructor(maxSuggestions: number = 5) {
    this.root = new TrieNode();
    this.maxSuggestions = maxSuggestions;
  }

  // Add a word to the trie
  public addWord(word: string): void {
    let node = this.root;
    
    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
      node.words.push(word);
    }
    node.isEndOfWord = true;
  }

  // Build the trie from a dictionary
  public buildFromDictionary(dictionary: Record<string, string[]>): void {
    Object.values(dictionary).forEach(category => {
      category.forEach(word => this.addWord(word));
    });
  }

  // Get suggestions for a given prefix
  public getSuggestions(prefix: string): string[] {
    if (!prefix) return [];

    let node = this.root;
    
    // Traverse the trie with the prefix
    for (const char of prefix.toLowerCase()) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char)!;
    }

    // Get unique suggestions
    const uniqueSuggestions = [...new Set(node.words)];
    
    // Sort by relevance (complete match first, then prefix match)
    return uniqueSuggestions
      .sort((a, b) => {
        const isCompleteMatchA = a.toLowerCase() === prefix.toLowerCase();
        const isCompleteMatchB = b.toLowerCase() === prefix.toLowerCase();
        if (isCompleteMatchA && !isCompleteMatchB) return -1;
        if (!isCompleteMatchA && isCompleteMatchB) return 1;
        return 0;
      })
      .slice(0, this.maxSuggestions);
  }
}
