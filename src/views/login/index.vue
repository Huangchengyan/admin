<template>
  <div class="login-container" style="">
    <vab-remix-icon icon-class="body" />
    <div class="loginMain">
      <div class="title-tips">
        <vab-remix-icon icon-class="logozh" />
      </div>
      <div class="titleSmaill">机场管理系统</div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="login-form"
        label-position="left"
      >
        <el-form-item prop="password" class="formItem">
          <span class="svg-container">
            <vab-remix-icon icon-class="password"></vab-remix-icon>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            size="medium"
            v-model.trim="form.source"
            :type="passwordType"
            tabindex="10"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          />
          <span
            v-if="passwordType === 'password'"
            class="showpassword"
            @click="handlePassword"
          >
            <vab-remix-icon icon-class="passwordopen"></vab-remix-icon>
          </span>
          <span v-else class="showpassword" @click="handlePassword">
            <vab-remix-icon icon-class="passwordopen"></vab-remix-icon>
          </span>
        </el-form-item>
        <el-button
          :loading="loading"
          size="medium"
          class="login-btn"
          type="primary"
          @click="handleLogin"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
.loginBody {
  position: absolute;
  width: 100% !important;
  height: 100% !important;
  z-index: -1;
}
.title-tips {
  font-size: 26px;
  color: #333;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-tips svg {
  width: 75px !important;
  height: 75px !important;
  margin-right: 6px;
}
.titleSmaill {
  text-align: center;
  font-size: 20px;
  padding-bottom: 40px;
  font-weight: 600;
  color: #333;
}
.login-container {
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
.loginMain {
  opacity: 1;
  width: 360px;
  margin: 80px auto;
  transition: all 0.3s;
  z-index: 2;
}
.formItem {
  position: relative;
}
.formItem span {
  position: absolute;
  z-index: 999;
  left: 10px;
  top: 8px;
}
.formItem .showpassword {
  width: 20px;
  height: 20px;
  left: 330px;
  top: 8px;
}
.formItem span svg {
  color: #9299a3;
  width: 20px !important;
  height: 20px !important;
}
.formItem .el-input__inner {
  height: 36px !important;
  margin-bottom: 5px !important;
  line-height: 36px !important;
  padding-left: 40px !important;
  font-size: 14px !important;
}
.login-btn {
  width: 100%;
  height: 40px;
  font-size: 14px;
}
</style>


<script>
import { isPassword } from "@/utils/validate";
export default {
  name: "Login",
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    const validatePassword = (value, callback) => {
      if ("" == value) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      nodeEnv: process.env.NODE_ENV,
      title: "登录",
      form: {
        source: "",
      },
      rules: {
        source: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = (route.query && route.query.redirect) || "/";
      },
      immediate: true,
    },
  },
  created() {
    document.body.style.overflow = "hidden";
  },
  beforeDestroy() {
    document.body.style.overflow = "auto";
  },
  mounted() {
    this.form.username = "";
    this.form.password = "";
  },
  methods: {
    handlePassword() {
      this.passwordType === "password"
        ? (this.passwordType = "")
        : (this.passwordType = "password");
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.form)
            .then(() => {
              const routerPath =
                this.redirect === "/404" || this.redirect === "/401"
                  ? "/"
                  : this.redirect;
              this.$router.push(routerPath).catch(() => {});
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
