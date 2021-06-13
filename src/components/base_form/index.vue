<!--
 * @Descripttion: 基础表单封装
 * @Date: 2021-05-20 21:10:24
 * @LastEditTime: 2021-05-23 22:51:27
-->
<template>
  <a-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    v-if="formArr.length"
  >
    <a-form-item
      v-for="(item, index) in formArr"
      :ref="item.name"
      :label="item.label"
      :name="item.name"
    >
      <a-input
        v-if="item.type === 'text'"
        v-model:value="formData[item.name]"
        :maxLength="item.maxLength"
        :placeholder="item.placeholder"
      />
      <a-textarea
        v-else-if="item.type === 'textarea'"
        v-model:value="formData[item.name]"
        :maxLength="item.maxLength"
        :placeholder="item.placeholder"
      />
    </a-form-item>
    <a-row type="flex" justify="center" v-if="footer.length">
      <a-space>
        <a-button
          v-for="(item, index) in footerArr"
          :type="item.type"
          :loading="item.loading"
          @click="item.onClick(formRef)"
          >{{ item.text }}</a-button
        >
      </a-space>
    </a-row>
  </a-form>
</template>
<script lang="ts">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { Moment } from "moment";
import { defineComponent, reactive, ref, UnwrapRef } from "vue";

export default defineComponent({
  props: {
    rules: {
      //验证规则
      type: Object,
    },
    labelCol: {
      //label宽度
      type: Object,
      default: {
        span: 4,
      },
    },
    wrapperCol: {
      //wrapper宽度
      type: Object,
      default: {
        span: 14,
      },
    },
    formState: {
      //表单值配置
      type: Array,
      default: [],
    },
    footer: {
      //底部按钮
      type: Array,
      default: [],
    },
  },
  name: "BaseForm",
  setup(props, context) {
    const { formState, footer } = props;
    //搜索数据
    const formInitData: any = {};
    formState.forEach((obj: any) => {
      formInitData[obj.name] = obj.initialValue;
    });
    //表单渲染值
    const formArr = reactive<any>(formState);
    //表单footer
    const footerArr = reactive<any>(footer);
    //表单值
    const formData: UnwrapRef<any> = reactive(formInitData);
    const formRef = ref();
    return {
      formRef,
      formData,
      formArr,
      footerArr,
    };
  },
});
</script>
