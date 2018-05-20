<template>
  <el-row class="broadcast-edit-container">
    <el-col :span="16" :offset="4">
      <el-card>
        <el-col>
          <el-button type="text" icon="el-icon-back" @click="back">返回</el-button>
        </el-col>
        <el-form label-position="top" :model="broadForEdit">
          <el-form-item>
            <el-tag>
              <i class="el-icon-date"></i>
              时间
            </el-tag>
            <h3>{{broadForEdit.timestamp | Date}}</h3>
          </el-form-item>
          <el-form-item>
            <el-tag>
              <i class="el-icon-caret-right"></i>
              播放
            </el-tag>
            <el-col>
              <audio :src="$_baseURL + broadForEdit.filename" controls>
                您的浏览器不支持播放音频文件
              </audio>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-tag>
              <i class="el-icon-document"></i>
              内容
            </el-tag>
            <p v-if="!isModification">{{broadForEdit.content || '暂无内容'}}</p>
            <el-input v-if="isModification" type="textarea" v-model="broadForEdit.content" size="meduim" :autosize="{minRows: 4,maxRows: 35}" placeholder="请输入内容"></el-input>
            <el-button type="warning" plain size="mini" v-if="isModification" icon="el-icon-refresh" @click="cancel">取消</el-button>
            <el-button size="mini" type="primary" plain icon="el-icon-edit" @click="modify">{{isModification? '修改': '编辑'}}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      edit: 'BroadcastEdit',
      isModification: false,
      broadForEdit: {
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
      }
    }
  },
  watch: {
    updateRecordingResult (newValue) {
      if (newValue.code === 200) {
        this.isModification = false
        this.getRecordingById(this.$route.params.id)
      }
    },
    broadForEdit () {
      this.isModification = false
    }
  },
  computed: {
    ...mapGetters({
      // broadForEdit: 'broadForEdit',
      updateRecordingResult: 'updateRecordingResult'
    })
  },
  methods: {
    ...mapActions({
      getRecordingById: 'getRecordingById',
      updateRecording: 'updateRecording'
    }),
    modify () {
      this.isModification && this.updateRecording(this.broadForEdit)
      this.isModification = !this.isModification
    },
    cancel () {
      this.getRecordingById(this.$route.params.id)
    },
    back () {
      this.$router.push({
        path: '/broadcast'
      })
    }
  },
  mounted () {
    // this.getRecordingById(this.$route.params.id)
  }
}
</script>
