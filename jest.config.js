/*
 * @Descripttion: jest配置文件
 * @Date: 2021-07-13 17:52:07
 */
module.exports = {
  moduleFileExtensions: ['vue', 'js', 'ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  // 匹配 __tests__ 目录下的 .js/.ts 文件 或 xx.test.js/ts xx.spec.js/ts
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' // 配置 jest 下 @ -> src
  }
}