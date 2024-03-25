// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset"],
//   // 按需引入
//   plugins: [
//     [
//       "import",
//       {
//         libraryName: "vant",
//         libraryDirectory: "es",
//         style: true,
//       },
//       "vant",
//     ],
//   ],
// };

var plugins = [
  [
    "import",
    {
      libraryName: "vant",
      libraryDirectory: "es",
      style: true,
    },
    "vant",
  ],
];
// if (process.env.NODE_ENV === "production") {
//   plugins.push("transform-remove-console");
// }

module.exports = {
  presets: [
    [
      "@vue/app",
      {
        useBuiltIns: "entry",
        polyfills: ["es6.promise", "es6.symbol"],
      },
    ],
  ],
  plugins: plugins,
};
