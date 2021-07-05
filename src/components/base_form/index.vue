<!--
 * @Descripttion: 基础表单封装
 * @Date: 2021-05-20 21:10:24
 * @LastEditTime: 2021-07-06 01:10:07
-->
<template>
  <a-form
    ref="formRef"
    :model="formDatas"
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
        v-model:value="formDatas[item.name]"
        :maxLength="item.maxLength"
        :placeholder="item.placeholder"
      />
      <a-select
        v-if="item.type === 'select'"
        v-model:value="formDatas[item.name]"
        :options="item.options"
        :placeholder="item.placeholder"
      />
      <a-textarea
        v-else-if="item.type === 'textarea'"
        v-model:value="formDatas[item.name]"
        :maxLength="item.maxLength"
        :placeholder="item.placeholder"
      />
      <div
        v-else-if="item.type === 'upload'"
        class="upload"
        @click="(e) => uploadChange(e, item.name)"
      >
        <a-input
          type="file"
          :accept="item.accept"
          class="hidden"
          id="uploadRef"
        >
        </a-input>
        <a-input class="hidden" v-model:value="formDatas[item.name]"></a-input>
        <a-avatar
          v-if="Boolean(formDatas[item.name]) && !loading"
          :src="formDatas[item.name]"
          :size="100"
          shape="square"
        ></a-avatar>
        <loading-outlined v-else-if="loading"></loading-outlined>
        <plus-outlined v-else :size="18"></plus-outlined>
      </div>
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
import {
  UploadOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, UnwrapRef } from "vue";
import { message } from "ant-design-vue";
import { uploadFile } from "@/service/upload";

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
  components: { UploadOutlined, PlusOutlined, LoadingOutlined },
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
    const formDatas: UnwrapRef<any> = reactive(formInitData);
    //表单节点
    const formRef = ref();
    //上传状态
    const loading = ref(false);
    //文件上传
    const uploadChange = (info: any, name: string) => {
      const uploadRef: HTMLElement | null =
        document.getElementById("uploadRef");
      if (!uploadRef) return false;
      uploadRef.click();
      uploadRef.onchange = async (e: any) => {
        const file = e.target.files;
        const fileValue = new FormData();
        if (!file) {
          return false;
        }
        if (file.size > 1024 * 1024 * 3) {
          message.error("文件大小不能超过3M!");
          return false;
        }
        fileValue.append("file", file[0]);
        loading.value = true;
        try {
          const res: any = await uploadFile(fileValue);
          if (res) {
            formDatas[name] = res.data.url;
            formRef.value.clearValidate(name);
          } else {
            message.error("文件上传失败!");
          }
        } catch (err) {
          console.log(err);
        }
        loading.value = false;
      };
    };
    return {
      formRef,
      formDatas,
      formArr,
      footerArr,
      uploadChange,
      loading,
    };
  },
});
</script>

<style scoped>
.upload {
  width: 102px;
  height: 102px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.upload:hover {
  border: 1px dashed #1890ff;
}

.hidden {
  display: none !important;
}
</style>
