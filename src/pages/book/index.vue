<!--
 * @Descripttion: 图书管理列表
 * @Date: 2021-05-03 10:32:30
 * @LastEditTime: 2021-08-01 18:59:18
-->
<template>
  <div>
    <search-table
      url="book/list"
      :columns="columns"
      :formState="formState"
      :tool="tool"
      ref="tableRef"
    >
      <template #name="{ text, record }">
        <a @click="editData(record.id)" v-if="hasPermission(4)">{{ text }}</a>
        <span v-else>{{ text }}</span>
      </template>
      <template #content="{ text }">
        <a-popover :content="text">
          {{ text }}
        </a-popover>
      </template>
      <template #create_time="{ text }">
        <a-popover :content="text">
          {{ text }}
        </a-popover>
      </template>
      <template #action="{ record }">
        <a-space>
          <a @click="editData(record.id)" v-if="hasPermission(2)">编辑</a>
          <a-popconfirm
            title="确定删除嘛？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="delConfirm(record.id)"
            v-if="hasPermission(3)"
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
        :label="{ span: 4 }"
        :wrapperCol="{ span: 18 }"
        :rules="rules"
        :formState="formConfig"
        :footer="footer"
      />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import {
  ref,
  defineComponent,
  reactive,
  UnwrapRef,
  computed,
  onMounted,
} from "vue";
import { addBook, editBook, delBook, detailBook } from "@/service/book";
import SearchTable from "@/components/search_table/index.vue";
import BaseForm from "@/components/base_form/index.vue";
import { formProps } from "./index.d";
import { formStateProps } from "@/components/base_form/index.d";
import { toolProps } from "@/components/search_table/index.d";
import { permissionProps } from "@/router/index.d";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

//表格列配置
const columns = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    width: "20%",
    ellipsis: true,
    slots: { customRender: "name" },
  },
  {
    title: "描述",
    dataIndex: "content",
    key: "content",
    width: "50%",
    ellipsis: true,
    slots: { customRender: "content" },
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    key: "create_time",
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
    placeholder: "名称",
  },
  {
    type: "text",
    name: "content",
    initialValue: "",
    placeholder: "描述",
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
  content: [
    {
      required: true,
      message: "不能为空！",
    },
  ],
};

export default defineComponent({
  components: {
    SearchTable,
    BaseForm,
  },
  name: "Book",
  setup: (props, cxt) => {
    const store = useStore();
    //选中数据的id
    const getId = ref<number | null>(null);
    //表格组件节点
    const tableRef = ref();
    //请求状态
    const loading = ref<boolean>(false);
    //弹窗标题
    const title = computed(() => {
      return `${getId.value ? "修改" : "新增"}数据`;
    });

    //是否存在权限
    const hasPermission = (id: number) => {
      return computed(() => store.getters["permission/getPermission"](id))
        .value;
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
        placeholder: "请填写名称",
        label: "名称",
        maxLength: 15,
      },
      {
        type: "textarea",
        name: "content",
        initialValue: "",
        placeholder: "请填写描述",
        label: "描述",
        maxLength: 100,
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
                    return await editBook({ id: getId.value, ...result });
                  } else {
                    //新增
                    return await addBook(result);
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

    onMounted(() => {
      getTool();
    });

    //初始化tool
    const getTool = () => {
      if (hasPermission(1)) {
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
      const res: any = await detailBook({ id });
      if (res) {
        formConfig.forEach((obj: any) => {
          obj.initialValue = res.data[obj.name];
        });
        changeVisible(true);
      }
    };
    //删除
    const delConfirm = async (id: number) => {
      const res: any = await delBook({ id });
      if (res) {
        message.success("操作成功!");
        reset();
      }
    };
    return {
      columns,
      formState,
      tool,
      visible,
      changeVisible,
      formConfig,
      rules,
      footer,
      tableRef,
      delConfirm,
      editData,
      title,
      hasPermission,
    };
  },
});
</script>

<style lang="less"></style>
