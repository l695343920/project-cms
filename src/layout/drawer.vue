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
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";
import { replaceStyleVariables } from "vite-plugin-theme/es/client";
export default defineComponent({
  name: "Drawer",
  components: {
    SettingOutlined,
  },
  setup(props, context) {
    const currentInstance: any = getCurrentInstance();
    const visible = ref<boolean>(false);
    const afterVisibleChange = (bool: boolean) => {
      // console.log("visible", bool);
    };

    //抽屉显示
    const showDrawer = () => {
      visible.value = true;
    };

    //改变主题色
    const tagChange = async (color: string) => {
      await replaceStyleVariables({
        colorVariables: [color],
      });
      // currentInstance.appContext.config.globalProperties.$initThemeBgColor(
      //   color
      // );
      // (window as any).less
      //   .modifyVars({
      //     "@primary-color": color,
      //     "@link-color": color,
      //     "@btn-primary-bg": color,
      //   })
      //   .then(() => {
      //     console.log(1);
      //   })
      //   .catch((err: any) => {
      //     console.log(2, err);
      //   });
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
