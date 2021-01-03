module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      ['import', 
        { 
          libraryName: 'antd', 
          libraryDirectory: 'lib', 
          style: 'css' 
        }
      ],
      "@babel/plugin-proposal-optional-chaining"
    ],
    presets: [
      [
        "@babel/env",
        {
          targets: {
              chrome: "67",
          },
          useBuiltIns: "usage",
          modules: false,
          corejs: {
              "version": 3,
              "proposals": true
          }
        }
      ],
      "@babel/react",
      "@babel/preset-typescript"
    ]
  }
}