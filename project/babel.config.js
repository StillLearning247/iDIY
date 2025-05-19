module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            '@': './app',
          },
          resolvePath: (sourcePath, currentFile, opts) => {
            return sourcePath;
          },
        },
      ],
    ],
  };
};
