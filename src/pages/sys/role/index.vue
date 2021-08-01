<!--
 * @Descripttion: 角色列表
 * @Date: 2021-05-26 20:39:46
-->
<template>
  <search-table
    url="role/list"
    :columns="columns"
    :formState="formState"
    :tool="tool"
    ref="tableRef"
  >
    <template #avatar="{ text }"><a-avatar :src="text" /> </template>
    <template #create_time="{ text }">
      <a-popover :content="text">
        {{ text }}
      </a-popover>
    </template>
    <template #action="{ record }">
      <a-space>
        <a
          @click="editData(record.id)"
          v-if="record.id != 1 && hasPermission(8)"
          >编辑</a
        >
        <a-popconfirm
          title="确定删除嘛？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="delConfirm(record.id)"
          v-if="record.id != 1 && hasPermission(9)"
        >
          <a>删除</a>
        </a-popconfirm>
      </a-space>
    </template>
  </search-table>
  <a-modal
    v-if="visible"
    v-model:visible="visible"
    :title="title"
    :footer="false"
    width="600px"
  >
    <BaseForm
      :label="{ span: 5 }"
      :wrapperCol="{ span: 17 }"
      :rules="rules"
      :formState="formConfig"
      :footer="footer"
    />
  </a-modal>
</template>

<script lang="ts">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import {
  defineComponent,
  reactive,
  ref,
  toRaw,
  UnwrapRef,
  computed,
  onMounted,
} from "vue";
import SearchTable from "@/components/search_table/index.vue";
import BaseForm from "@/components/base_form/index.vue";
import { formProps } from "./index.d";
import { formStateProps } from "@/components/base_form/index.d";
import { toolProps } from "@/components/search_table/index.d";
import { message } from "ant-design-vue";
import { addRole, editRole, delRole, detailRole } from "@/service/role";
import { useStore } from "vuex";

//表格列配置
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
  },
  {
    title: "角色名称",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    slots: { customRender: "action" },
  },
];

//表单配置
const formState = [
  {
    type: "text",
    name: "name",
    initialValue: "",
    placeholder: "角色名",
  },
];

//baseform 验证规则
const rules = {
  name: [
    {
      required: true,
      message: "不能为空！",
    },
  ],
};

export default defineComponent({
  name: "Role",
  components: {
    SearchTable,
    BaseForm,
  },
  setup(props, ctx) {
    const store = useStore();
    //选中数据的id
    const getId = ref<number | null>(null);
    //表格组件节点
    const tableRef = ref();
    //请求状态
    const loading = ref<boolean>(false);
    //弹窗标题
    const title = computed(() => {
      return `${getId.value ? "修改" : "新增"}角色`;
    });

    onMounted(() => {
      getTool();
    });

    //刷新表格数据
    const reset = () => {
      if (tableRef) {
        tableRef.value.featchList();
      }
    };

    //是否存在权限
    const hasPermission = (id: number) => {
      return computed(() => store.getters["permission/getPermission"](id))
        .value;
    };

    let formConfig = reactive<formStateProps[]>([
      {
        type: "text",
        name: "name",
        initialValue: "",
        placeholder: "请填写角色名",
        label: "角色名",
        maxLength: 15,
      },
    ]);

    //baseform 表单footer
    const footer = [
      {
        type: "primary",
        text: "保存",
        loading,
        onClick: (e: any) => {
          e.validate()
            .then(async (result: formProps) => {
              loading.value = true;
              try {
                //请求数据
                const requestData = async () => {
                  //修改
                  if (getId.value) {
                    return await editRole({ id: getId.value, ...result });
                  } else {
                    //新增
                    return await addRole(result);
                  }
                };
                const res: any = await requestData();
                if (res) {
                  message.success("操作成功!");
                  visible.value = false;
                  tableRef.value.params.pageIndex = 1;
                  reset();
                }
              } catch (err) {
                console.log(err);
              }
              loading.value = false;
            })
            .catch((error: ValidateErrorEntity<formProps>) => {
              console.log("error", error);
            });
        },
      },
      {
        type: "default",
        text: "取消",
        onClick: (e: Event) => {
          visible.value = false;
        },
      },
    ];

    //弹窗状态
    const visible = ref<boolean>(false);

    //表格工具栏
    let tool = reactive<toolProps[]>([]);

    const getTool = () => {
      if (hasPermission(7)) {
        tool.push({
          type: "primary",
          label: "新增",
          onClick: () => {
            //重置数据
            getId.value = null;
            formConfig.forEach((obj: any) => {
              obj.initialValue = "";
            });
            changeVisible(true);
          },
        });
      }
    };
    //改变弹窗状态
    const changeVisible = (state: boolean) => {
      visible.value = state;
    };

    //编辑
    const editData = async (id: number) => {
      getId.value = id;
      const res: any = await detailRole({ id });
      if (res) {
        formConfig.forEach((obj: any) => {
          obj.initialValue = res.data[obj.name];
        });
        changeVisible(true);
      }
    };

    //删除
    const delConfirm = async (id: number) => {
      const res: any = await delRole({ id });
      if (res) {
        message.success("操作成功!");
        reset();
      }
    };
    return {
      tableRef,
      columns,
      tool,
      formState,
      formConfig,
      footer,
      visible,
      title,
      rules,
      delConfirm,
      editData,
      hasPermission,
    };
  },
});
</script>
