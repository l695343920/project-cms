<!--
 * @Descripttion: 用户列表
 * @Date: 2021-05-26 20:39:46
-->
<template>
  <search-table
    url="user/list"
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
        <a-popconfirm
          title="确定删除嘛？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="delConfirm(record.id)"
          v-if="record.roleId != 1"
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
import { message } from "ant-design-vue";
import { addUser, editUser, delUser, detailUser } from "@/service/user";
import { getRole } from "@/service/role";

//表格列配置
const columns = [
  {
    title: "用户名",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "头像",
    dataIndex: "avatar",
    key: "avatar",
    ellipsis: true,
    slots: { customRender: "avatar" },
  },
  {
    title: "角色名称",
    dataIndex: "role.roleName",
    key: "role.roleName",
    ellipsis: true,
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    key: "create_time",
    ellipsis: true,
    slots: { customRender: "create_time" },
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
    placeholder: "用户名",
  },
  {
    type: "range-picker",
    name: ["start_time", "end_time"],
    initialValue: "",
    placeholder: ["开始时间", "结束时间"],
    format: "YYYY-MM-DD",
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
  roleId: [
    {
      required: true,
      message: "不能为空！",
    },
  ],
  avatar: [
    {
      required: true,
      message: "不能为空！",
    },
  ],
};

export default defineComponent({
  name: "Sys",
  components: {
    SearchTable,
    BaseForm,
  },
  setup(props, ctx) {
    //选中数据的id
    const getId = ref<number | null>(null);
    //表格组件节点
    const tableRef = ref();
    //请求状态
    const loading = ref<boolean>(false);
    //弹窗标题
    const title = computed(() => {
      return `${getId.value ? "修改" : "新增"}用户`;
    });
    //角色options
    let roleOptions = reactive([]);

    onMounted(() => {
      getRoleList();
    });

    //获取角色列表
    const getRoleList = async () => {
      const roleList: any = await getRole();
      roleOptions = roleList.data.data;
    };

    //刷新表格数据
    const reset = () => {
      if (tableRef) {
        tableRef.value.featchList();
      }
    };

    let formConfig = reactive<formStateProps[]>([
      {
        type: "text",
        name: "name",
        initialValue: "",
        placeholder: "请填写用户名",
        label: "用户名",
        maxLength: 15,
      },
      {
        type: "select",
        name: "roleId",
        initialValue: "",
        placeholder: "请选择",
        label: "角色",
        options: roleOptions,
        optionLabelName: "name",
        optionValueName: "id",
      },
      {
        type: "upload",
        name: "avatar",
        initialValue: "",
        placeholder: "请上传头像",
        label: "头像",
        action: "/api/public/upload",
        list_type: "picture",
        maxLength: 1,
        accept: "image/png, image/jpeg, image/gif, image/jpg",
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
                    return await editUser({ id: getId.value, ...result });
                  } else {
                    //新增
                    return await addUser(result);
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
        type: "",
        text: "取消",
        onClick: (e: Event) => {
          visible.value = false;
        },
      },
    ];

    //弹窗状态
    const visible = ref<boolean>(false);
    //表格工具栏
    const tool = [
      {
        type: "primary",
        label: "新增",
        onClick: () => {
          //重置数据
          getId.value = null;
          formConfig[1].options = roleOptions;
          formConfig.forEach((obj: any) => {
            obj.initialValue = "";
          });
          changeVisible(true);
        },
      },
    ];
    //改变弹窗状态
    const changeVisible = (state: boolean) => {
      visible.value = state;
    };

    //删除
    const delConfirm = async (id: number) => {
      const res: any = await delUser({ id });
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
    };
  },
});
</script>
