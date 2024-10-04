import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': 'off', // Disable the prop-types validation rule
      'no-undef': 'warn', // Change 'no-undef' from error to warning
      'no-unused-vars': 'warn', // Change 'no-unused-vars' from error to warning
      'react/no-unescaped-entities': 'warn', // Change 'react/no-unescaped-entities' from error to warning
    },
  },
]
