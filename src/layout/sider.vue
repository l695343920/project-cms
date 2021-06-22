<!--
 * @Descripttion: 菜单
 * @Date: 2021-05-30 13:44:24
-->
<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo"></div>
    <a-menu
      theme="dark"
      mode="inline"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @click="handleClick"
    >
      <a-menu-item key="1">
        <home-outlined />
        <span>工作台</span>
      </a-menu-item>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <calendar-outlined />
            <span>图书管理</span>
          </span>
        </template>
        <a-menu-item key="2">
          <book-outlined />
          <span>图书列表</span>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #title>
          <span>
            <setting-outlined />
            <span>系统管理</span>
          </span>
        </template>
        <a-menu-item key="3">
          <user-outlined />
          <span>用户列表</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import {
  BookOutlined,
  CalendarOutlined,
  SettingOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    //是否收缩菜单
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  name: "Sider",
  components: {
    BookOutlined,
    CalendarOutlined,
    SettingOutlined,
    UserOutlined,
    HomeOutlined,
  },
  setup() {
    const router = useRouter();
    const selectedKeys = ref<string[]>(["1"]);
    const openKeys = ref<string[]>([]);
    const handleClick = (e: any) => {
      if (e.key === "1") {
        router.push("/work");
      }
      if (e.key === "2") {
        router.push("/book");
      }
      if (e.key === "3") {
        router.push("/sys");
      }
    };
    return {
      selectedKeys,
      openKeys,
      handleClick,
    };
  },
});
</script>
<style>
#components-layout-demo-custom-trigger .ant-layout-sider {
  min-height: 100vh;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
