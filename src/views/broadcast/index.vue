<template>
  <el-row class="broadcast-container">
    <el-col>
      <el-button type="text" @click="logoutConfirm">
        退出登录
        <i class="iconfont icon-tuichu"></i>
      </el-button>
    </el-col>
    <el-card class="box-card" v-for="(broad, index) in broadcast" :key="index">
      <el-col slot="header" class="clearfix">
        <el-col :span="20">
          <el-tag>
            <h3>
              <i class="el-icon-service"></i>
              {{broad.timestamp | Date}}
            </h3>
          </el-tag>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain size="small" icon="el-icon-edit" @click="editBroadcast(broad.id)">编辑语音</el-button>
        </el-col>
      </el-col>
      <el-col>
        <el-col :span="20">
          <p class="broadcast-content">{{broad.content || '暂无内容'}}</p>
        </el-col>
        <el-col :span="20">
            <audio :src="$_baseURL + broad.filename" controls>
              您的浏览器不支持播放音频文件
            </audio>
        </el-col>
        <el-col :span="4">
          <el-button type="text" icon="el-icon-delete" size="mini" @click="deleteBroadcastConfirm(broad.id,index)">删除语音</el-button>
        </el-col>
      </el-col>
    </el-card>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" v-loading="loading"></div>
  </el-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
      title: 'BroadCast',
      pagination: {
        page: 1,
        per_page: 5
      },
      busy: true,
      broadcast: [],
      indexForDelete: ''
    }
  },
  watch: {
    deleteRecordingResult () {
      this.broadcast.splice(this.indexForDelete, 1)
      this.getRecordings(this.pagination)
    },
    broadcastList: {
      handler: function (newValue, oldValue) {
        if (newValue.length === 0) this.busy = true
        else {
          this.broadcast = this.broadcast.concat(newValue)
          this.busy = false
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      broadcastList: 'broadcastList',
      deleteRecordingResult: 'deleteRecordingResult',
      loading: 'loading'
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
    editBroadcast (id) {
      this.$router.push({
        path: `/broadcast/edit/${id}`
      })
    },
    logoutConfirm () {
      this.$confirm('确定退出登录？', '提示', {
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(err => console.log(err))
    },
    deleteBroadcastConfirm (id, index) {
      this.$confirm('确定删除该语音？', '提示', {
        type: 'warning'
      }).then(() => {
        this.indexForDelete = index
        this.deleteBroadcast(id)
      }).catch(err => console.log(err))
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.pagination.page++
        this.getRecordings(this.pagination)
      }, 1200)
    }
  },
  mounted () {
    this.getRecordings(this.pagination)
  }
}
</script>
