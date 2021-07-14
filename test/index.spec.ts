/*
 * @Descripttion: index测试文件
 * @Date: 2021-07-13 17:54:39
 */
function sum(a:any, b:any) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});