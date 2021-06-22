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
      <a-tag class="tag" @click="() => tagChange('#fff')">白色</a-tag>
      <a-tag class="tag" color="blue" @click="() => tagChange('blue')"
        >蓝色</a-tag
      >
      <a-tag class="tag" color="yellow" @click="() => tagChange('yellow')"
        >黄色</a-tag
      >
    </div>
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "Drawer",
  components: {
    SettingOutlined,
  },
  setup(props, context) {
    const currentInstance: any = getCurrentInstance();
    const visible = ref<boolean>(false);
    console.log(getCurrentInstance(), 222222);
    const afterVisibleChange = (bool: boolean) => {
      console.log("visible", bool);
    };

    //抽屉显示
    const showDrawer = () => {
      visible.value = true;
    };

    //改变主题色
    const tagChange = (color: string) => {
      currentInstance.appContext.config.globalProperties.$initThemeBgColor(
        color
      );
    };

    return {
      visible,
      afterVisibleChange,
      showDrawer,
      tagChange,
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
}
</style>
