<!--
 * @Descripttion: layout
 * @Date: 2021-05-26 21:11:24
-->
<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <sider :collapsed="collapsed"></sider>
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
    let initCollapsed: boolean = false;
    //是否是移动端
    let isPhone: boolean = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    );
    if (isPhone) {
      //手机端
      initCollapsed = true;
    }
    //是否收缩菜单
    const collapsed = ref<boolean>(initCollapsed);
    //左边菜单收缩功能
    const triggerChange = () => {
      if (isPhone) return;
      collapsed.value = !collapsed.value;
    };
    return {
      triggerChange,
      collapsed,
    };
  },
});
</script>
<style lang="less"></style>
