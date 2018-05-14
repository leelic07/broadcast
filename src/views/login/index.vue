<template>
    <el-row class="top-content" @keyup.native.enter="submitForm('loginForm')">
        <el-col class="inner-bg">
            <el-col class="container">
                <el-col class="row">
                    <el-col :span="12" :offset="6" class="form-box">
                        <el-col class="form-top">
                            <el-col class="form-top-left">
                                <h2>语音播报</h2>
                                <p>请输入您的用户名和密码:</p>
                            </el-col>
                        </el-col>
                        <el-col class="form-bottom">
                            <el-form :model="loginForm" label-position="left" :rules="rules" ref="loginForm" role="form">
                                <el-form-item prop="username">
                                    <el-input v-model="loginForm.username" type="text" placeholder="请输入用户名"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="loginForm.password" type="password" placeholder="请输入用户密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-col>
                </el-col>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
import { mapMutations } from 'vuex'
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
      }
    }
  },
  methods: {
    ...mapMutations({
      login: 'login'
    }),
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) this.login(this.loginForm)
      })
    }
  },
  mounted () {
    if (localStorage.getItem('user')) {
      this.$router.replace('/dashboard')
    }
  }
}
</script>

<style type="text/stylus" lang="stylus" scoped>
@import '../../assets/css/style.css';
</style>
