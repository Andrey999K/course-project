module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "public/",
    "build/",
    "*.min.js",
    "src/dev/",
  ],
  rules: {
    indent: ["error", 2],
    semi: [2, "always"],
    "multiline-ternary": ["off"],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" },
    ],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "comma-dangle": ["error", "only-multiline"],
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 0 }],
  },
};
