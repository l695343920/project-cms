/*
 * @Descripttion: index测试文件
 * @Date: 2021-07-13 17:54:39
 */
import { mount } from '@vue/test-utils'

import Index from '@/components/base_form/index.vue'

describe('index.vue', () => {
  it('renders a index', () => {
    const wrapper = mount(Index)
    expect(wrapper.text()).toMatch('')
  })
})