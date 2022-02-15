module.exports = (api) => {
  api.cache(true);

  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/transform-runtime',
      '@emotion/babel-plugin',
    ],
  };
};
