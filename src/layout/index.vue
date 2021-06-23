<!--
 * @Descripttion: layout
 * @Date: 2021-05-26 21:11:24
-->
<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-drawer
      placement="left"
      :closable="false"
      v-model:visible="visible"
      v-if="isPhone"
      width="200"
      :bodyStyle="{ padding: 0 }"
    >
      <sider :collapsed="collapsed"></sider
    ></a-drawer>
    <sider :collapsed="collapsed" v-else></sider>
    <a-layout>
      <headers :collapsed="collapsed" @triggerChange="triggerChange"></headers>
      <content></content>
      <drawer></drawer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import Sider from "./sider.vue";
import Headers from "./headers.vue";
import Content from "./content.vue";
import Drawer from "./drawer.vue";

export default defineComponent({
  name: "Layout",
  components: {
    Sider,
    Headers,
    Content,
    Drawer,
  },
  setup() {
    //侧边栏菜单
    const visible = ref<boolean>(false);
    //是否是移动端
    let isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    );
    //是否收缩菜单
    const collapsed = ref<boolean>(isPhone);
    //左边菜单收缩功能
    const triggerChange = () => {
      if (isPhone) {
        visible.value = true;
        collapsed.value = false;
      } else {
        collapsed.value = !collapsed.value;
      }
    };
    return {
      triggerChange,
      collapsed,
      isPhone,
      visible,
    };
  },
});
</script>
<style lang="less"></style>
