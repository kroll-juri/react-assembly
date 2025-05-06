export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['fix', 'feat', 'chore', 'build', 'docs', 'ci', 'style', 'refactor', 'perf', 'test']
    ],
    'subject-case': [2, 'always', 'lower-case']
  }
};
