<template>
  <el-row class="broadcast-container">
    <el-col>
      <el-button type="text" @click="logoutConfirm">
        退出登录
        <i class="iconfont icon-tuichu"></i>
      </el-button>
      <el-card>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-button type="primary" size="small" icon="el-icon-menu" :disabled="checkedRecording.length < 2" @click="mergeRecordingConfirm">合并记录</el-button>
      </el-card>
    </el-col>
    <el-checkbox-group v-model="checkedRecording" @change="handleCheckedRecordingChange">
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
        content: `假如我是一朵雪花，
    翩翩的在半空里潇洒，
    　我一定认清我的方向——
    　飞扬，飞扬，飞扬，——
    这地面上有我的方向。
    不去那冷寞的幽谷，

    不去那凄清的山麓，
    　也不上荒街去惆怅——
    　飞扬，飞扬，飞扬，——
    你看，我有我的方向！

    在半空里娟娟的飞舞，
    认明了那清幽的住处，
    　等着她来花园里探望——
    　飞扬，飞扬，飞扬，——
    啊，她身上有朱砂梅的清香！

    　那时我凭借我的身轻，
    盈盈的②，沾住了她的衣襟，
    　贴近她柔波似的心胸——
    　消溶，消溶，消溶——
    溶入了她柔波似的心胸！    `,
        file: '',
        timestamp: '2018-05-20'
      }, {
        id: 2,
        content: `轻轻的我走了，
    　正如我轻轻的来；
    我轻轻的招手，
    　作别西天的云彩。

    那河畔的金柳
    　是夕阳中的新娘
    波光里的艳影，
    　在我的心头荡漾。

    软泥上的青荇，
    　油油的在水底招摇；
    在康河的柔波里，
    　我甘心做一条水草

    那树荫下的一潭，
    　不是清泉，是天上虹
    揉碎在浮藻间，
    　沉淀着彩虹似的梦。

    寻梦？撑一支长篙，
    　向青草更青处漫溯，
    满载一船星辉，
    　在星辉斑斓里放歌

    但我不能放歌，
    　悄悄是别离的笙箫；
    夏虫也为我沉默，
    　沉默是今晚的康桥！

    悄悄的我走了，
    　正如我悄悄的来；
    我挥一挥衣袖，
    　不带走一片云彩。`,
        file: '',
        timestamp: '2018-05-20'
      }, {
        id: 3,
        content: `假如我是一朵雪花，
    翩翩的在半空里潇洒，
    　我一定认清我的方向——
    　飞扬，飞扬，飞扬，——
    这地面上有我的方向。
    不去那冷寞的幽谷，

    不去那凄清的山麓，
    　也不上荒街去惆怅——
    　飞扬，飞扬，飞扬，——
    你看，我有我的方向！

    在半空里娟娟的飞舞，
    认明了那清幽的住处，
    　等着她来花园里探望——
    　飞扬，飞扬，飞扬，——
    啊，她身上有朱砂梅的清香！

    　那时我凭借我的身轻，
    盈盈的②，沾住了她的衣襟，
    　贴近她柔波似的心胸——
    　消溶，消溶，消溶——
    溶入了她柔波似的心胸！    `,
        file: '',
        timestamp: '2018-05-20'
      }],
      isIndeterminate: true,
      checkAll: false,
      recordingIds: [1, 2, 3],
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
        const checkedBroadcast = []
        this.broadcast.forEach(broad => {
          this.checkedRecording.forEach(id => {
            if (id === broad.id) checkedBroadcast.push(broad)
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
