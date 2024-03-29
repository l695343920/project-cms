<!--
 * @Descripttion: 搜索功能表格封装
 * @Date: 2021-05-18 20:14:05
 * @LastEditTime: 2021-08-01 19:53:05
-->
<template>
  <a-form
    ref="formRef"
    layout="inline"
    :model="formData"
    v-if="formState.length"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item
      v-for="(item, index) in formArr"
      :label="item.label"
      :name="item.name"
    >
      <a-input
        v-if="item.type === 'text'"
        v-model:value="formData[item.name]"
        :placeholder="item.placeholder"
      >
      </a-input>
      <a-date-picker
        v-else-if="item.type === 'date-picker'"
        v-model:value="formData[item.name]"
        :placeholder="item.placeholder"
        :format="item.format"
      />
      <a-range-picker
        v-else-if="item.type === 'range-picker'"
        v-model:value="formData[item.name]"
        :placeholder="item.placeholder"
        :format="item.format"
        @change="onChange"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit"> 查询 </a-button>
      <a-button class="reset" @click="resetForm"> 重置 </a-button>
    </a-form-item>
  </a-form>
  <a-divider />
  <a-row class="tool-row">
    <a-button
      v-for="(item, index) in toolArr"
      :type="item.type"
      @click="item.onClick"
      :class="item.class"
      >{{ item.label }}</a-button
    >
  </a-row>
  <a-table
    :columns="columns"
    :data-source="data"
    size="middle"
    rowKey="id"
    :loading="loading"
    :pagination="pagination"
    @change="handleTableChange"
    :scroll="{ x: isPhone }"
  >
    <template
      v-for="(item, index) in columnsArr"
      #[item.slots&&item.slots.customRender]="{ text, record, index }"
    >
      <slot
        :name="item.slots.customRender"
        :text="text"
        :record="record"
        :index="index"
      ></slot>
    </template>
  </a-table>
</template>

<script lang="ts">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import {
  ref,
  defineComponent,
  reactive,
  UnwrapRef,
  onMounted,
  computed,
} from "vue";
import { get } from "@/utils/request";
import { ParamsState, Pagination, Filters } from "./index.d";
import moment, { Moment } from "moment";

export default defineComponent({
  props: {
    formState: {
      //表单搜索值
      type: Array,
      default: [],
    },
    url: {
      type: String,
      default: "",
    }, //接口请求地址
    columns: {
      //表格列配置
      type: Array,
      default: [],
    },
    tool: {
      //表格tool
      type: Array,
      default: [],
    },
  },
  name: "SearchTable",
  setup: (props, cxt) => {
    const { url, formState, columns, tool } = props;

    const formArr = reactive<any>(formState);
    const toolArr = reactive<any>(tool);
    const columnsArr = reactive<any>(columns);
    //表单节点
    const formRef = ref();
    //搜索数据
    const formInitData: any = {};
    formState.forEach((obj: any) => {
      formInitData[obj.name] = obj.initialValue;
    });
    //表单值
    const formData: UnwrapRef<any> = reactive(formInitData);
    //验证规则
    const rulesRef = {
      name: [
        {
          required: false,
          message: "",
        },
      ],
      content: [
        {
          required: false,
          message: "",
        },
      ],
    };
    //表格数据
    const data = ref<any>([]);
    //分页参数
    const params = reactive<ParamsState>({
      pageIndex: 1,
      pageSize: 10,
    });
    //总条数
    const total = ref(10);
    //表格分页配置
    const pagination = computed(() => ({
      total: total.value,
      current: params.pageIndex,
      pageSize: params.pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
    }));
    //表格loading状态
    const loading = ref<boolean>(false);
    //请求数据方法
    const featchList = async () => {
      //请求数据,开启加载
      loading.value = true;
      try {
        const res: any = await get(url, {
          ...params,
          ...formData,
        });
        data.value = res.data.data;
        total.value = res.data.total;
      } catch (err) {
        console.log(err);
      }
      loading.value = false;
      //请求结束,关闭加载
    };
    onMounted(() => featchList());
    //成功回调
    const handleFinish = () => {
      params.pageIndex = 1;
      featchList();
    };
    //失败回调
    const handleFinishFailed = (errors: any) => {
      console.log(errors);
    };
    //重置表单的值
    const resetForm = () => {
      formRef.value.resetFields();
      params.pageIndex = 1;
      featchList();
    };
    //翻页
    const handleTableChange = (
      pag: Pagination,
      filters: Filters,
      sorter: any
    ) => {
      if (pag && pag.current && pag.pageSize) {
        params.pageIndex = pag.current;
        params.pageSize = pag.pageSize!;
        featchList();
      }
    };
    //时间范围改变
    const onChange = (value: Moment[], dateString: string[]) => {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    };
    const isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    );
    return {
      handleFinish,
      handleFinishFailed,
      resetForm,
      data,
      formData,
      loading,
      formArr,
      toolArr,
      formRef,
      pagination,
      handleTableChange,
      featchList,
      params,
      columnsArr,
      //是否是移动端
      isPhone,
      onChange,
    };
  },
});
</script>

<style scoped>
.tool-row {
  margin-bottom: 20px;
}
.reset {
  margin-left: 10px;
}
</style>
