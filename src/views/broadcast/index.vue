<template>
  <el-row class="broadcast-container">
    <el-col>
      <el-button type="text" @click="logoutConfirm">
        退出登录
        <i class="iconfont icon-tuichu"></i>
      </el-button>
      <el-card>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-button type="primary" size="small" icon="el-icon-menu" :disabled="checkedRecordingIds.length < 2" @click="mergeRecordingConfirm">合并记录</el-button>
        <el-button type="primary" icon="el-icon-search" size="small" @click="searchRecordings">搜索记录</el-button>
        <el-date-picker size="small" v-model="datetime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-select v-model="merged" size="small">
          <el-option v-for="(type,index) in mergedOptions" :key="index" :label="type.label" :value="type.value"></el-option>
        </el-select>
      </el-card>
    </el-col>
    <el-checkbox-group v-model="checkedRecordingIds" @change="handleCheckedRecordingChange">
      <el-card class="box-card" v-for="(broad, index) in broadcast" :key="index">
        <el-col slot="header" class="clearfix">
          <el-col :span="20">
            <el-checkbox :label="broad.id" :key="broad.timestamp">选择</el-checkbox>
            <el-tag>
              <h3>
                <i class="el-icon-time"></i>
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
      datetime: '',
      merged: '',
      busy: true,
      broadcast: [],
      mergedOptions: [{
        value: '',
        label: '全部记录'
      }, {
        value: false,
        label: '未合并记录'
      }, {
        value: true,
        label: '已合并记录'
      }],
      isIndeterminate: true,
      checkAll: false,
      allRecordingIds: [],
      checkedRecordingIds: [],
      checkedBroadcast: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
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
          this.broadcast.forEach(broad => this.allRecordingIds.push(broad.id))
        }
      }
    },
    mergeRecordingResult () {
      this.mergeRecording(this.checkedBroadcast)
    },
    recordingType () {
      console.log('type change')
    },
    datetime (newValue) {
      if (newValue) {
        this.pagination.start_time = newValue[0]
        this.pagination.end_time = newValue[1]
      } else {
        delete this.pagination.start_time
        delete this.pagination.end_time
      }
    },
    merged (newValue) {
      if (newValue !== '') {
        this.pagination.merged = newValue
      } else delete this.pagination.merged
    }
  },
  computed: {
    ...mapGetters({
      broadcastList: 'broadcastList',
      deleteRecordingResult: 'deleteRecordingResult',
      loading: 'loading',
      mergeRecordingResult: 'mergeRecordingResult'
    })
  },
  methods: {
    ...mapActions({
      getRecordings: 'getRecordings',
      deleteBroadcast: 'deleteBroadcast',
      sendRecordingIds: 'sendRecordingIds'
    }),
    ...mapMutations({
      logout: 'logout',
      mergeRecording: 'mergeRecording'
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
    },
    handleCheckAllChange (val) {
      this.checkedRecordingIds = val ? this.allRecordingIds : []
      this.isIndeterminate = false
    },
    handleCheckedRecordingChange (val) {
      let checkedCount = val.length
      this.checkAll = checkedCount === this.allRecordingIds.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allRecordingIds.length
    },
    mergeRecordingConfirm () {
      this.$confirm('确定合并选中的记录？', '提示', {
        type: 'warning'
      }).then(() => {
        this.broadcast.forEach(broad => {
          this.checkedRecordingIds.forEach(id => {
            if (id === broad.id) this.checkedBroadcast.push(broad)
          })
        })
        if (this.checkedBroadcast.length) {
          this.sendRecordingIds(this.checkedRecordingIds)
        }
      }).catch(err => console.log(err))
    },
    searchRecordings () {
      this.broadcast.splice(0)
      this.pagination.page = 1
      this.getRecordings(this.pagination)
    }
  },
  mounted () {
    this.getRecordings(this.pagination)
  }
}
</script>
