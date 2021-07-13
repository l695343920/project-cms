/*
 * @Descripttion: jest配置文件
 * @Date: 2021-07-13 17:52:07
 */
module.exports = {
  moduleNameMapper: {
    "/@/(.*)$": "<rootDir>/src/$1",
  },
  // 转义
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest",
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx"],
};
