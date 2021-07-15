<!--
 * @Descripttion: 菜单
 * @Date: 2021-05-30 13:44:24
-->
<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    :width="width"
    :theme="theme"
  >
    <div class="logo"></div>
    <a-menu
      :theme="theme"
      mode="inline"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
    >
      <template v-for="(item, index) in routerData">
        <template v-if="!item.children.length">
          <a-menu-item :key="String(index)" @click="handleClick(item.path)">
            <component :is="antIcons[item.meta.icon]"></component>
            {{ item.name }}
          </a-menu-item>
        </template>
        <template v-else>
          <a-sub-menu :key="getSub(index)">
            <template #title>
              <component :is="antIcons[item.meta.icon]"></component>
              {{ item.name }}
            </template>
            <template v-for="(subItem, i) in item.children">
              <a-menu-item :keys="i" @click="handleClick(subItem.path)">
                <component :is="antIcons[subItem.meta.icon]"></component>
                {{ subItem.name }}
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </template>
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
import {
  defineComponent,
  ref,
  reactive,
  computed,
  getCurrentInstance,
  onMounted,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    //是否收缩菜单
    collapsed: {
      type: Boolean,
      default: false,
    },
    //宽度
    width: {
      type: String,
      default: "200px",
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
    let selectedKeys = ref<string[]>([]); //选中的菜单
    let openKeys = ref<string[]>([]); //打开的菜单

    const store = useStore();
    const currentInstance: any = getCurrentInstance();
    const theme = computed(() => store.state.layout.theme); // 主题色
    const routerData = computed(() => store.state.router.routers); // 路由
    const antIcons = //图标
      currentInstance.appContext.config.globalProperties.$antIcons;

    onMounted(() => {
      initKeys();
    });

    //设置默认的选中菜单
    const initKeys = () => {
      const pathname = location.pathname;
      let key: any;
      const searchKeys = (arr: any[], isChild: boolean) => {
        arr.forEach((obj: any, index: Number) => {
          if (!isChild) {
            key = index;
          }
          if (obj.path === pathname) {
            selectedKeys.value = [
              isChild ? `sub${key}-menu-item_${index}` : String(index),
            ];
            openKeys.value = [`sub${key}`];
          }
          searchKeys(obj.children, true);
        });
      };
      searchKeys(routerData.value, false);
    };

    //菜单点击跳转
    const handleClick = (path: string) => {
      router.push(path);
    };

    //获得sub-mean的标识
    const getSub = (index: any) => {
      return "sub" + index;
    };

    return {
      selectedKeys,
      openKeys,
      handleClick,
      theme,
      routerData,
      antIcons,
      getSub,
    };
  },
});
</script>
<style>
.ant-layout-sider {
  min-height: 100vh;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
