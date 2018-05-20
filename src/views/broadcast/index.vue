<template>
  <el-row class="broadcast-container">
    <el-col>
      <el-button type="text" @click="logoutConfirm">
        退出登录
        <i class="iconfont icon-tuichu"></i>
      </el-button>
      <el-card>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-button type="primary" size="small" :disabled="checkedRecording.length < 2" @click="mergeRecordingConfirm">合并记录</el-button>
      </el-card>
    </el-col>
    <el-checkbox-group v-model="checkedRecording" @change="handleCheckedRecordingChange">
      <el-card class="box-card" v-for="(broad, index) in broadcast" :key="index">
        <el-col slot="header" class="clearfix">
          <el-col :span="20">
            <el-checkbox :label="broad.id" :key="broad.timestamp">选择</el-checkbox>
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
            <el-button type="text" icon="el-icon-delete" size="mini" @click="deleteBroadcastConfirm(broad.id)">删除语音</el-button>
          </el-col>
        </el-col>
      </el-card>
    </el-checkbox-group>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" v-loading="loading"></div>
  </el-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
      pagination: {
        page: 1,
        per_page: 5
      },
      busy: true,
      broadcast: [{
        id: 1,
        content: 'xxxxxxxxxx',
        file: '',
        timestamp: '2018-05-20'
      }, {
        id: 2,
        content: 'yyyyyyyyyyy',
        file: '',
        timestamp: '2018-05-20'
      }],
      isIndeterminate: true,
      checkAll: false,
      recordingIds: [1, 2],
      checkedRecording: []
    }
  },
  watch: {
    deleteRecordingResult () {
      this.getRecordings()
    },
    broadcastList: {
      handler: function (newValue, oldValue) {
        if (newValue.length === 0) this.busy = true
        else {
          this.broadcast = this.broadcast.concat(newValue)
          this.busy = false
          this.broadcast.forEach(broad => this.recordingIds.push(broad.id))
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
      logout: 'logout',
      mergeRecording: 'mergeRecording'
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
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.pagination.page++
        this.getRecordings(this.pagination)
      }, 1200)
    },
    handleCheckAllChange (val) {
      this.checkedRecording = val ? this.recordingIds : []
      this.isIndeterminate = false
    },
    handleCheckedRecordingChange (val) {
      let checkedCount = val.length
      this.checkAll = checkedCount === this.recordingIds.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.recordingIds.length
    },
    mergeRecordingConfirm () {
      this.$confirm('确定合并选中的记录？', '提示', {
        type: 'warning'
      }).then(() => {
        const checkedBroadcast = this.broadcast.filter(broad => {
          this.checkedRecording.forEach(id => {
            if (id === broad.id) return true
          })
        })
        if (checkedBroadcast.length) {
          this.mergeRecording(checkedBroadcast)
        }
      }).catch(err => console.log(err))
    }
  },
  mounted () {
    // this.getRecordings(this.pagination)
  }
}
</script>
