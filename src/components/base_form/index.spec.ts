/*
 * @Descripttion: search_table测试文件
 * @Date: 2021-07-31 16:47:07
 */
import { mount } from "@vue/test-utils";
import BaseForm from "./index";
import ant from "ant-design-vue";
import { ref } from "vue";
(window as any).matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

let wrapper: any;

describe("BaseForm", () => {
  // describe 代表一个作用域

  wrapper = mount(
    {
      components: {
        BaseForm,
      },
      template: `<base-form 
        :formState="formState" 
        :rules="rules" 
        :footer="footer"
        ></base-form>`,
      setup() {
        const formState = [
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
          {
            type: "select",
            name: "roleId",
            initialValue: "",
            placeholder: "请选择",
            label: "角色",
            options: [{ name: "超管", id: "1" }],
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
        ];
        const rules = {
          name: [
            {
              required: true,
              message: "不能为空！",
            },
          ],
        };
        const loading = ref<boolean>(false);
        const footer = [
          {
            type: "primary",
            text: "保存",
            loading,
            onClick: (e: any) => {},
          },
          {
            type: "default",
            text: "取消",
            onClick: (e: Event) => {},
          },
        ];
        return {
          formState,
          rules,
          footer,
        };
      },
    },
    {
      global: {
        plugins: [ant],
      },
    }
  );

  it("表单是否正常", async () => {
    await wrapper.find("input[type=text]").setValue("name");
    await wrapper.find("textarea").setValue("Lorem ipsum dolor sit amet");
    await wrapper.find(".ant-select-selection-search-input").setValue("1");
  });

  it("footer是否正常", async () => {
    expect(wrapper.find(".ant-btn-primary span").text()).toEqual("保 存");
  });
});
