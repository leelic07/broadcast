<template>
  <el-row class="container-box broadcast-container">
    <el-col>
      <el-button type="text" @click="logout">
        退出登录
        <i class="iconfont icon-tuichu"></i>
      </el-button>
    </el-col>
    <el-card class="box-card" v-for="(broad, index) in broadcastList" :key="index">
      <el-col slot="header" class="clearfix">
        <el-col :span="20">
          <el-tag>
            <h3>
              <i class="el-icon-service"></i>
              {{broad.createdAt}}
            </h3>
          </el-tag>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain round size="small" icon="el-icon-edit" @click="editBroadcast(broad.id)">编辑语音播报</el-button>
        </el-col>
      </el-col>
      <el-col>
        <el-col :span="20">
          <p class="broadcast-content">{{broad.content}}</p>
        </el-col>
        <el-col>
            <audio :src="broad.file" controls>
              您的浏览器不支持播放音频文件
            </audio>
        </el-col>
      </el-col>
    </el-card>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: 'BroadCast'
      // broadcastList: [{
      //   id: 1,
      //   title: '语音播报管理系统',
      //   content: '语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统',
      //   createdAt: '2018-5-15 09:41',
      //   file: './static/zgz.mp3'
      // }, {
      //   id: 2,
      //   title: '语音播报管理系统',
      //   content: '语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统',
      //   createdAt: '2018-5-15 09:41',
      //   file: './static/zgz.mp3'
      // }, {
      //   id: 3,
      //   title: '语音播报管理系统',
      //   content: '语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统',
      //   createdAt: '2018-5-15 09:41',
      //   file: './static/zgz.mp3'
      // }, {
      //   id: 4,
      //   title: '语音播报管理系统',
      //   content: '语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统',
      //   createdAt: '2018-5-15 09:41',
      //   file: './static/zgz.mp3'
      // }, {
      //   id: 5,
      //   title: '语音播报管理系统',
      //   content: '语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统',
      //   createdAt: '2018-5-15 09:41',
      //   file: './static/zgz.mp3'
      // }, {
      //   id: 6,
      //   title: '语音播报管理系统',
      //   content: '语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统,语音播报管理系统',
      //   createdAt: '2018-5-15 09:41',
      //   file: './static/zgz.mp3'
      // }]
    }
  },
  watch: {
    broadcast (newValue) {
      console.log(newValue)
    }
  },
  computed: {
    ...mapGetters({
      broadcastList: 'broadcastList'
    })
  },
  methods: {
    ...mapActions({
      getRecordings: 'getRecordings'
    }),
    editBroadcast (id) {
      this.$router.replace({
        path: `/broadcast/edit/${id}`
      })
    },
    logout () {
      this.$confirm('确定退出登录？', '提示', {
        confrimButtonText: '确定',
        confirmCancelText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.replace({
          path: '/login'
        })
      }).catch(err => console.log(err))
    }
  },
  mounted () {
    this.getRecordings()
  }
}
</script>
