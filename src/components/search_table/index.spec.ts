/*
 * @Descripttion: search_table测试文件
 * @Date: 2021-07-31 16:47:07
 */
import { mount } from "@vue/test-utils";
import SearchTable from "./index";
import ant from "ant-design-vue";
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

describe("SearchTable", () => {
  // describe 代表一个作用域

  wrapper = mount(
    {
      components: {
        SearchTable,
      },
      template: `<search-table 
        :formState="formState" 
        :url="url"
        :columns="columns" 
        :tool="tool"
        >
        <template #action="{ record }">
          <a-space>
            <a>编辑</a>
            <a>删除</a>
          </a-space>
        </template>
      </search-table>`,
      setup() {
        const formState = [
          {
            type: "text",
            name: "name",
            initialValue: "1",
            placeholder: "名称",
            class: "name",
          },
        ];
        const url = "book/list";
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
            title: "操作",
            dataIndex: "action",
            key: "action",
            slots: { customRender: "action" },
          },
        ];
        const tool = [
          {
            type: "primary",
            label: "新增",
            class: "add",
            onClick: () => {},
          },
        ];
        return {
          formState,
          url,
          columns,
          tool,
        };
      },
    },
    {
      global: {
        plugins: [ant],
      },
    }
  );

  it("tool是否正常", async () => {
    expect(wrapper.find(".add").text()).toEqual("新 增");
  });

  it("搜索表单是否正常", async () => {
    const name = wrapper.find("#name");
    name.setValue("1");
    expect(name.attributes("placeholder")).toBe("名称");
    expect(name.attributes("type")).toBe("text");
  });

  it("table是否正常", async () => {
    expect(wrapper.find(".ant-table-column-title").text()).toEqual("名称");
  });
});
