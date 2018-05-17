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
            <h3>{{broadForEdit.Timestamp | Date}}</h3>
          </el-form-item>
          <el-form-item>
            <el-tag>
              <i class="el-icon-caret-right"></i>
              播放
            </el-tag>
            <el-col>
              <video :src="$_baseURL + broadForEdit.Filename" controls width="100%" height="35px">
                您的浏览器不支持播放音频文件
              </video>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-tag>
              <i class="el-icon-document"></i>
              内容
            </el-tag>
            <p v-if="!isModification">{{broadForEdit.Content || '暂无内容'}}</p>
            <el-input v-if="isModification" type="textarea" v-model="broadForEdit.Content" size="meduim" :autosize="{minRows: 4,maxRows: 35}" placeholder="请输入内容"></el-input>
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
      isModification: false
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
      broadForEdit: 'broadForEdit',
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
    this.getRecordingById(this.$route.params.id)
  }
}
</script>
