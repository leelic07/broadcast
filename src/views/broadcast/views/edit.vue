<template>
  <el-row class="container-box broadcast-edit-container">
    <el-col :span="16" :offset="4">
      <el-card>
        <el-col>
          <el-button type="text" icon="el-icon-back" @click="back">返回</el-button>
        </el-col>
        <el-form label-position="top" :model="broadForEdit">
          <el-form-item>
            <el-tag>标题</el-tag>
            <h3>{{broadForEdit.title}}</h3>
          </el-form-item>
          <el-form-item>
            <el-tag>内容</el-tag>
            <p v-if="!isModification">{{broadForEdit.content}}</p>
            <el-input v-if="isModification" type="textarea" v-model="broadForEdit.content" size="meduim" :autosize="{minRows: 4,maxRows: 35}"></el-input>
            <el-button size="large" type="text" icon="el-icon-edit" @click="modify($event)">{{isModification? '修改': '编辑'}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-tag>播放</el-tag>
            <el-col>
              <!-- <el-button type="primary" circle>
                <i class="iconfont icon-bofangzanting"></i>
              </el-button>
              <el-progress :percentage="50"></el-progress> -->
              <audio :src="broadForEdit.file" controls>
                您的浏览器不支持播放音频文件
              </audio>
            </el-col>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      edit: 'BroadcastEdit',
      broadForEdit: {
        id: 1,
        title: '语音播报管理系统',
        content: '语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统',
        createdAt: '2018-5-15 09:41',
        file: './static/zgz.mp3'
      },
      isModification: false
    }
  },
  methods: {
    modify (e) {
      let btn = e.target.innerHTML
      if (btn === '编辑') {
        this.isModification = true
      } else {
        this.isModification = false
      }
    },
    back () {
      this.$router.push({
        path: '/broadcast'
      })
    }
  }
}
</script>
