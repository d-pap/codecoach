import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginImport from 'eslint-plugin-import'

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': 'off',
      'no-undef': 'warn',
      'no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'warn',
    },
  },
  {
    plugins: {
      import: pluginImport,
      react: pluginReact,
    },
    rules: {
      'import/no-unresolved': 'warn', // warn on unresolved imports
      'import/order': 'warn', // enforce a consistent import order
    },
  },
  {
    ignores: [
      '.env',
      '.gitignore',
      '.hintrc',
      '.prettierignore',
      '.prettierrc',
      'src/amplifyconfiguration.json',
      'src/aws-exports.js',
      'amplify/**',
      'assets/**',
      'build/**',
      'node_modules/**',
      'public/**',
    ],
  },
]
