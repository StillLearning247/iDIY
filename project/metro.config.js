const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Exclude specific WebSocket-related packages
config.resolver.blockList = [
  /node_modules[\\/]ws[\\/]/,
  /node_modules[\\/]bufferutil[\\/]/,
  /node_modules[\\/]utf-8-validate[\\/]/,
  /node_modules[\\/]@supabase[\\/]supabase-js[\\/]dist[\\/]/,
];

// Add polyfills for Node.js built-in modules
config.resolver.extraNodeModules = {
  stream: require.resolve('stream-browserify'),
  buffer: require.resolve('buffer'),
  process: require.resolve('process/browser'),
  crypto: require.resolve('crypto-browserify'),
};

// Add aliases for Supabase
config.resolver.alias = {
  '@supabase/supabase-js': '@supabase/supabase-js/dist/main',
};

module.exports = config;
