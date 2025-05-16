export class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

export class Trie {
  private root: TrieNode;
  private maxSuggestions: number;

  constructor(maxSuggestions: number = 5) {
    this.root = new TrieNode();
    this.maxSuggestions = maxSuggestions;
  }

  public addWord(word: string): void {
    let node = this.root;

    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }

    node.isEndOfWord = true;
  }

  public buildFromDictionary(dictionary: Record<string, string[]>): void {
    Object.values(dictionary).forEach(category => {
      category.forEach(word => this.addWord(word));
    });
  }

  public getSuggestions(prefix: string): string[] {
    let node = this.root;
    prefix = prefix.toLowerCase();

    for (const char of prefix) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char)!;
    }

    const suggestions: string[] = [];
    this.collectSuggestions(node, prefix, suggestions);
    return suggestions.slice(0, this.maxSuggestions);
  }

  private collectSuggestions(node: TrieNode, currentWord: string, suggestions: string[]): void {
    if (suggestions.length >= this.maxSuggestions) return;

    if (node.isEndOfWord) {
      suggestions.push(currentWord);
    }

    for (const [char, child] of node.children) {
      this.collectSuggestions(child, currentWord + char, suggestions);
    }
  }
}