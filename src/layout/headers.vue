<!--
 * @Descripttion: 头部
 * @Date: 2021-05-30 14:16:17
-->
<template>
  <a-layout-header class="header">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="outlinedClick"
    />
    <menu-fold-outlined v-else class="trigger" @click="outlinedClick" />

    <a-dropdown class="dropdown">
      <a class="ant-dropdown-link" @click.prevent>
        <div class="avatar-view">
          <a-avatar :src="userInfo.avatar"> </a-avatar>
          <down-outlined></down-outlined>
        </div>
      </a>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item>
            <a href="javascript:;">修改资料</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">退出</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>
<script lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
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
  name: "Headers",
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
  },
  setup(props, context) {
    const router = useRouter();

    //获取用户信息
    let userInfo: any = localStorage.getItem("userInfo");

    if (typeof userInfo === "string") {
      try {
        userInfo = JSON.parse(userInfo);
      } catch (err) {
        console.log(err);
      }
    }
    //logo点击
    const outlinedClick = () => {
      context.emit("triggerChange");
    };
    //头像下拉菜单
    const handleMenuClick = (e: any) => {
      if (e.item.index === 1) {
        router.push("/login");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
      }
    };
    return {
      outlinedClick,
      handleMenuClick,
      userInfo,
    };
  },
});
</script>
<style lang="less">
.header {
  padding: 0;
  position: relative;
}

.dropdown {
  position: absolute;
  right: 16px;
  top: 16px;
}

.avatar-view {
  width: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
