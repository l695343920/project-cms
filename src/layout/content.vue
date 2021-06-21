<!--
 * @Descripttion: 内容区域
 * @Date: 2021-06-20 11:24:50
-->
<template>
  <a-layout-content
    :style="{
      margin: '24px 16px',
      padding: '24px',
      background: '#fff',
    }"
  >
    <router-view></router-view>
  </a-layout-content>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Content",
});
</script>
