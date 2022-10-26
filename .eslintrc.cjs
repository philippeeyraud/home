/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
<<<<<<< HEAD
    "@vue/eslint-config-typescript/recommended",
=======
    "@vue/eslint-config-typescript",
   
>>>>>>> 7e323a39caacee20d07d9ffd53106e0ee010fd99
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
