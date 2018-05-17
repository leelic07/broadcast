<template>
  <el-row class="broadcast-container">
    <el-col>
      <el-button type="text" @click="logoutConfirm">
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
              {{broad.Timestamp | Date}}
            </h3>
          </el-tag>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain size="small" icon="el-icon-edit" @click="editBroadcast(broad.Id)">编辑语音</el-button>
        </el-col>
      </el-col>
      <el-col>
        <el-col :span="20">
          <p class="broadcast-content">{{broad.Content || '暂无内容'}}</p>
        </el-col>
        <el-col :span="20">
            <audio :src="$_baseURL + broad.Filename" controls>
              您的浏览器不支持播放音频文件
            </audio>
        </el-col>
        <el-col :span="4">
          <el-button type="text" icon="el-icon-delete" size="mini" @click="deleteBroadcastConfirm(broad.Id)">删除语音</el-button>
        </el-col>
      </el-col>
    </el-card>
  </el-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      title: 'BroadCast'
    }
  },
  watch: {
    deleteRecordingResult () {
      this.getRecordings()
    }
  },
  computed: {
    ...mapGetters({
      broadcastList: 'broadcastList',
      deleteRecordingResult: 'deleteRecordingResult'
    })
  },
  methods: {
    ...mapActions({
      getRecordings: 'getRecordings',
      deleteBroadcast: 'deleteBroadcast'
    }),
    ...mapMutations({
      logout: 'logout'
    }),
    editBroadcast (Id) {
      this.$router.push({
        path: `/broadcast/edit/${Id}`
      })
    },
    logoutConfirm () {
      this.$confirm('确定退出登录？', '提示', {
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(err => console.log(err))
    },
    deleteBroadcastConfirm (id) {
      this.$confirm('确定删除该语音？', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteBroadcast(id)
      }).catch(err => console.log(err))
    }
  },
  mounted () {
    this.getRecordings()
  }
}
</script>
