import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  reactRecommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.eslint.json',
      },
      globals: globals.browser,
    },
    plugins: {
      js,
      react,
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-console': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'always' }],

      // Сортировка импортов
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Внешние библиотеки
            ['^react$', '^react-dom$', '^[a-z]'],

            // 2. Стандартные хуки React
            ['^react', '^use[A-Z]'],

            // 3. Компоненты (все алиасы на компоненты и layout)
            [
              '^@components/',
              '^@layout/',
              '^@app-layout/',
              '^@app-header/',
              '^@app-footer/',
              '^@app-ui/',
            ],

            // 4. Кастомные хуки
            ['^@hooks/'],

            // 5. Страницы
            ['^@pages/'],

            // 6. Redux store, slice, reducer, namespace
            ['^@store/', '^@namespace/', '^@reducer/', '^@slice/'],

            // 7. Сервисы и API
            ['^@service/', '^@api/'],

            // 8. Прочее (utils, route-path, app и относительные пути)
            [
              '^@utils/',
              '^@app/',
              '^\\.\\.(?!/?$)',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
            ],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'script',
    },
  },

  globalIgnores([
    '**/node_modules/',
    '**/dist/',
    'commitlint.config.js',
    'eslint.config.js',
  ]),
]);
