<!--
 * @Descripttion: 设置
 * @Date: 2021-06-20 12:07:30
-->
<template>
  <a-affix :style="{ position: 'absolute', top: '240px', right: '0px' }">
    <a-button type="primary" @click="showDrawer" class="drawer_btn"
      ><setting-outlined></setting-outlined
    ></a-button>
  </a-affix>
  <a-drawer
    placement="right"
    :closable="false"
    v-model:visible="visible"
    :after-visible-change="afterVisibleChange"
  >
    <p>主题色</p>
    <div>
      <a-tag
        v-for="(item, index) in tagData"
        class="tag"
        @click="() => tagChange(item.value)"
        :color="item.value"
        >{{ item.name }}</a-tag
      >
    </div>
    <p>导航模式</p>
    <div>
      <a-tag
        v-for="(item, index) in siderData"
        class="tag"
        @click="() => siderChange(item.value)"
        :color="item.bg"
        >{{ item.name }}</a-tag
      >
    </div>
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";
import { replaceStyleVariables } from "vite-plugin-theme/es/client";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "Drawer",
  components: {
    SettingOutlined,
  },
  setup(props, context) {
    const store = useStore();
    const currentInstance: any = getCurrentInstance();
    const visible = ref<boolean>(false);
    const afterVisibleChange = (bool: boolean) => {
      // console.log("visible", bool);
    };

    //抽屉显示
    const showDrawer = () => {
      visible.value = true;
    };

    //全局提示
    const success = () => {
      const hide = message.loading("正在加载主题");
      setTimeout(hide, 2500);
    };

    //改变主题色
    const tagChange = async (color: string) => {
      await replaceStyleVariables({
        colorVariables: [color],
      });
      success();
    };

    //改变左边菜单主题
    const siderChange = (color: string) => {
      store.dispatch("layout/fetchTheme", color);
      success();
    };
    return {
      visible,
      afterVisibleChange,
      showDrawer,
      tagChange,
      tagData: [
        { name: "黑色", value: "black" },
        { name: "蓝色", value: "blue" },
        { name: "绿色", value: "green" },
        { name: "紫色", value: "purple" },
        { name: "黄色", value: "yellow" },
        { name: "红色", value: "red" },
        { name: "粉红色", value: "pink" },
        { name: "橙黄色", value: "orange" },
      ],
      siderData: [
        { name: "普通模式", bg: "blue", value: "light" },
        { name: "暗黑模式", bg: "black", value: "dark" },
      ],
      siderChange,
    };
  },
});
</script>

<style lang="less">
.drawer_btn {
  width: 48px;
  height: 48px;
  font-size: 20px;
  border-radius: 4px 0 0 4px;
}
.tag {
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
