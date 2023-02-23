<!--
 * @Descripttion: 权限管理
 * @Date: 2021-07-17 20:01:20
-->
<template>
  <a-row>
    <a-col :xs="24" :lg="12">
      <h3>角色列表</h3>
      <a-tree
        v-if="roleOptions.length"
        ref="leftNode"
        :defaultExpandAll="true"
        :replaceFields="replaceFields"
        v-model:selectedKeys="selectedKeys"
        :tree-data="roleOptions"
        :show-line="true"
      >
      </a-tree>
    </a-col>
    <a-col :xs="24" :lg="12">
      <div class="right-box">
        <h3 class="title">权限列表</h3>
        <a-tree
          v-if="permissionOptions.length"
          ref="rightNode"
          checkable
          :defaultExpandAll="true"
          v-model:checkedKeys="checkedKeys"
          :replaceFields="replaceFields"
          :tree-data="permissionOptions"
          :selectable="false"
          :expandedKeys="expandedKeys"
        >
        </a-tree>
        <a-row class="footer" v-if="selectedKeys[0].id !== 1">
          <a-space>
            <a-button type="primary" @click="onSubmit">保存</a-button>
            <a-button>取消</a-button>
          </a-space>
        </a-row>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  reactive,
  onMounted,
  computed,
} from "vue";
import { TreeDataItem } from "ant-design-vue/es/tree/Tree";
import { getRole, editRole } from "@/service/role";
import { getList } from "@/service/permission";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { permissionProps } from "@/router/index.d";
import { checkkeyProps, selectkeyProps } from "./index.d";

export default defineComponent({
  name: "Permission",
  components: {},
  setup(props, ctx) {
    const store = useStore();

    let checkedKeys = ref<checkkeyProps[]>([]);
    const selectedKeys = ref<selectkeyProps[]>([{ id: 1, name: "超级管理员" }]);
    const expandedKeys = ref<checkkeyProps[]>([]);
    //角色options
    let roleOptions = reactive<TreeDataItem>([]);
    //权限options
    let permissionOptions = ref<TreeDataItem>([]);
    //权限列表
    let permissionAll: TreeDataItem[] = [];
    //自定义字段
    const replaceFields = {
      title: "name",
    };

    //树节点
    const leftNode = ref(null);
    const rightNode = ref(null);

    onMounted(() => {
      getRoleList();
    });

    //获取权限列表
    const getPermission = async (roleId: number) => {
      const res: any = await getList({ roleId });
      permissionOptions.value = [];
      expandedKeys.value = [];
      //得到标识
      const getKey = (obj: any) => {
        const type = obj.parentId ? "mean" : "permission";
        const { id } = obj;
        return {
          id,
          type,
        };
      };
      const getId = (obj: any) => getKey(obj).id + getKey(obj).type;
      //不是管理员的权限
      let otherMap = new Map();
      //所有的权限列表
      if (roleId === 1) {
        permissionAll = [];
        permissionAll = permissionAll.concat(res.data);
      } else {
        res.data.forEach((obj: permissionProps) => {
          otherMap.set(getId(obj), obj);
        });
      }

      let map = new Map();
      permissionAll.forEach((obj: any) => {
        obj.children = [];
        obj.key = getKey(obj);
        expandedKeys.value.push(obj.key);
        //设置默认选择项
        if (otherMap.get(getId(obj))) {
          checkedKeys.value.push(obj.key);
        }

        obj.disabled = roleId === 1;

        obj.parentId && map.set(obj.id, obj);
        if (obj.id === obj.parentId) {
          permissionOptions.value.push(obj);
        } else {
          const id = obj.parentId || obj.meanId;
          if (!map.get(id)) {
            map.set(id, { children: [] });
          }
          map.get(id).children.push(obj);
          //添加样式
          if (obj.meanId) {
            map.get(id).class = "child-node";
          }
        }
      });
    };

    //获取角色列表
    const getRoleList = async () => {
      let map = new Map();
      let result: TreeDataItem[] = [];
      const roleList: any = await getRole();
      roleList.data.data.forEach((obj: any, index: number) => {
        obj.children = [];
        obj.key = { id: obj.id, name: obj.name };
        map.set(obj.id, obj);
        if (obj.id === 1) {
          selectedKeys.value = [obj.key];
          result.push(map.get(obj.id));
        } else {
          let value = map.get(1);
          value.children= value.children || [];
          value.children.push(obj);
          map.set(1, value);
        }
      });
      result.forEach((obj: TreeDataItem) => {
        roleOptions.push(obj);
      });
    };

    watch(checkedKeys, () => {
      console.log("checkedKeys", checkedKeys);
    });

    watch(selectedKeys, () => {
      console.log("selectKeys", selectedKeys);
      getPermission(selectedKeys.value[0].id);
    });

    //保存
    const onSubmit = async () => {
      const { id, name } = selectedKeys.value[0];
      const meanId = checkedKeys.value
        .filter((obj: any) => obj.type === "mean")
        .map((obj: any) => obj.id)
        .join();
      const permissionId = checkedKeys.value
        .filter((obj: any) => obj.type === "permission")
        .map((obj: any) => obj.id)
        .join();
      const res = await editRole({
        id,
        name,
        meanId,
        permissionId,
      });
      if (res) {
        message.success("操作成功!");
      }
    };

    return {
      roleOptions,
      selectedKeys,
      checkedKeys,
      leftNode,
      rightNode,
      replaceFields,
      permissionOptions,
      onSubmit,
      expandedKeys,
    };
  },
});
</script>

<style lang="less">
.right-box {
  min-height: 600px;
  background: #f0f2f5;
  padding: 10px 24px;
  .ant-tree-switcher {
    display: none !important;
  }
  .footer {
    padding-left: 40px;
    padding-bottom: 20px;
    margin-top: 20px;
  }
  .child-node {
    .ant-tree-child-tree {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
