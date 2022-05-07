module.exports = (api) => {
  api.cache(true)

  return {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/transform-runtime',
      '@emotion/babel-plugin',
      'macros',
    ],
  }
}
