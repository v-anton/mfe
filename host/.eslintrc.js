module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "prettier", "filenames"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "import/extensions": 0,
    "import/prefer-default-export": "off",
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": ["error", { custom: "ignore" }],
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "prefer-destructuring": "off",
    "filenames/match-regex": [2, "^[a-z._-]+$", true],
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["~"],
      },
      typescript: {},
    },
  },
};
