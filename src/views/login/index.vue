<template>
  <el-row class="top-content"
    @keyup.native.enter="submitForm('loginForm')">
    <el-col class="inner-bg">
      <el-col class="container">
        <el-col class="row">
          <el-col :span="6"
            class="set-host">
            <label>
              <el-input v-model="host"
                placeholder="请填写访问的主机名，端口"
                size="small">
                <template slot="prepend">
                  http://
                </template>
                <el-button slot="append"
                  type="primary"
                  @click="reload">刷新</el-button>
              </el-input>
            </label>
          </el-col>
          <el-col :span="12"
            :offset="6"
            class="form-box">
            <el-col class="form-top">
              <el-col class="form-top-left">
                <h2>国科随身记</h2>
                <p>请输入您的用户名和密码:</p>
              </el-col>
            </el-col>
            <el-col class="form-bottom">
              <el-form :model="loginForm"
                label-position="left"
                :rules="rules"
                ref="loginForm"
                role="form">
                <el-form-item prop="username">
                  <el-input v-model="loginForm.username"
                    type="text"
                    placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="loginForm.password"
                    type="password"
                    placeholder="请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"
                    @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
      <el-col class="copy-right">
        <p>国科政信(北京)股份有限公司</p>
        <p>copyright@2006-2015. All right reserved</p>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import config from '../../service/config/base'

export default {
  data () {
    return {
      loginForm: {
        password: '',
        username: ''
      },
      rules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      },
      host: ''
    }
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  methods: {
    ...mapActions({
      login: 'login'
    }),
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) this.login(this.loginForm)
      })
    },
    reload () {
      this.$confirm('应用将会重启，确定该操作？', '提示', {
        type: 'warning'
      }).then(() => {
        localStorage['host'] = this.host
        config.baseURL = this.host
        window.location.reload()
      }).catch(err => console.log(err))
    }
  },
  mounted () {
    this.host = localStorage['host']
  }
}
</script>

<style type="text/stylus" lang="stylus" scoped>
@import '../../assets/css/style.css';

white = #fff;

.top-content {
  .set-host {
    position: absolute;
    right: -20%;
    transition: all linear 0.5s;

    &:hover {
      right: 0;
      cursor: pointer;
    }
  }

  .copy-right {
    position: fixed;
    bottom: 0;

    p {
      color: white;
      font-size: 14px;
      margin-top: 5px;
    }
  }
}
</style>
