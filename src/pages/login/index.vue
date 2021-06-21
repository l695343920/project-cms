<!--
 * @Descripttion: 登录页面
 * @Date: 2021-05-26 20:39:46
-->
<template>
  <div class="sky">
    <div class="clouds_one"></div>
    <div class="clouds_two"></div>
    <div class="clouds_three"></div>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item class="title"> 图书管理系统 </a-form-item>
      <a-form-item name="user">
        <a-input
          v-model:value="formState.user"
          placeholder="用户名："
          class="user"
        />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="formState.password"
          placeholder="密码："
          class="password"
        />
      </a-form-item>
      <a-row type="flex" justify="center">
        <a-button
          type="primary"
          @click="onSubmit"
          :style="{ width: '58.8%' }"
          class="login"
          >登录</a-button
        >
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { hashSync } from "bcryptjs";
import { loginUser } from "@/service/login";

interface FormState {
  user: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  setup(props, ctx) {
    const router = useRouter();
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      user: "",
      password: "",
    });
    const rules = {
      user: [
        {
          required: true,
          message: "请填写用户名！",
        },
      ],
      password: [
        {
          required: true,
          message: "请填写密码！",
        },
      ],
    };
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async (value: any) => {
          const { user, password } = value;
          const res: any = await loginUser({
            name: user,
            password,
          });
          if (res) {
            message.success("登录成功!");
            //设置token
            localStorage.setItem("token", res.data.token);
            //设置用户信息
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            router.push("/book");
          }
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      formState,
      rules,
      onSubmit,
      resetForm,
    };
  },
});
</script>
<style lang="less">
.sky {
  height: 100vh;
  background: #007fd5;
  position: relative;
  overflow: hidden;
  -webkit-animation: sky_background 50s ease-out infinite;
  -moz-animation: sky_background 50s ease-out infinite;
  -o-animation: sky_background 50s ease-out infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sky .clouds_one {
  background: url("../../assets/images/cloud_one.png");
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  -webkit-animation: cloud_one 50s linear infinite;
  -moz-animation: cloud_one 50s linear infinite;
  -o-animation: cloud_one 50s linear infinite;
  animation: cloud_one 50s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.sky .clouds_two {
  background: url("../../assets/images/cloud_two.png");
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  -webkit-animation: cloud_two 75s linear infinite;
  -moz-animation: cloud_two 75s linear infinite;
  -o-animation: cloud_two 75s linear infinite;
  animation: cloud_two 75s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.sky .clouds_three {
  background: url("../../assets/images/cloud_three.png");
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  -webkit-animation: cloud_three 100s linear infinite;
  -moz-animation: cloud_three 100s linear infinite;
  -o-animation: cloud_three 100s linear infinite;
  animation: cloud_three 100s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

@-webkit-keyframes sky_background {
  0% {
    background: #007fd5;
    color: #007fd5;
  }
  50% {
    background: #000;
    color: #a3d9ff;
  }
  100% {
    background: #007fd5;
    color: #007fd5;
  }
}
@-moz-keyframes sky_background {
  0% {
    background: #007fd5;
    color: #007fd5;
  }
  50% {
    background: #000;
    color: #a3d9ff;
  }
  100% {
    background: #007fd5;
    color: #007fd5;
  }
}
@keyframes sky_background {
  0% {
    background: #007fd5;
    color: #007fd5;
  }
  50% {
    background: #000;
    color: #a3d9ff;
  }
  100% {
    background: #007fd5;
    color: #007fd5;
  }
}

@-webkit-keyframes cloud_one {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@-moz-keyframes cloud_one {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@keyframes cloud_one {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}

@-webkit-keyframes cloud_two {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@-moz-keyframes cloud_two {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@keyframes cloud_two {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}

@-webkit-keyframes cloud_three {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@-moz-keyframes cloud_three {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@keyframes cloud_three {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
.sky .title {
  color: #fff;
  text-shadow: 0.2rem 0rem 0.5rem #fff, -0.2rem 0rem 0.5rem #fff,
    0rem 0.2rem 0.5rem #fff, 0rem -0.2rem 0.5rem #fff;
  font-size: 30px;
  text-align: center;
  margin-bottom: 40px;
}

.sky .ant-form {
  width: 600px;
  padding: 80px 0;
  background: rgba(230, 230, 250, 0.15);
  border-radius: 8px;
}

.sky .ant-form-item {
  display: flex;
  justify-content: center;
}

.sky .user {
  height: 44px;
  opacity: 0.6;
}

.sky .password {
  height: 44px;
  opacity: 0.6;
}

.sky .login {
  height: 44px;
  background: rgba(30, 144, 255, 0.6);
}
</style>
