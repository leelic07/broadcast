<template>
  <el-row class="broadcast-edit-container">
    <el-col :span="16"
      :offset="4">
      <el-card>
        <el-col>
          <el-button type="text"
            icon="el-icon-back"
            @click="back">返回</el-button>
          <h2>
            <i class="el-icon-edit"></i>
            编辑记录
          </h2>
        </el-col>
        <el-form label-position="top"
          :model="broadForEdit">
          <el-form-item>
            <el-tag>
              <i class="el-icon-time"></i>
              时间
            </el-tag>
            <h3>{{broadForEdit.timestamp | Date}}</h3>
          </el-form-item>
          <el-form-item>
            <el-tag>
              <i class="el-icon-caret-right"></i>
              播放
            </el-tag>
            <el-col v-if="broadForEdit.filename">
              <audio :src="$_baseURL + broadForEdit.filename"
                controls>
                您的浏览器不支持播放音频文件
              </audio>
            </el-col>
            <el-col v-else
              v-for="(file,index) in broadForEdit.refs"
              :key="index">
              <el-col :span="22">
                <audio :src="file.filename"
                  controls></audio>
              </el-col>
              <el-col :span="2">
                <el-button type="text"
                  @click="showDetail(file.id)">详情</el-button>
              </el-col>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-tag>
              <i class="el-icon-document"></i>
              内容
            </el-tag>
            <p v-if="!isModification">{{broadForEdit.content || '暂无内容'}}</p>
            <el-input v-if="isModification"
              type="textarea"
              v-model="broadForEdit.content"
              size="meduim"
              :autosize="{minRows: 4,maxRows: 35}"
              placeholder="请输入内容"></el-input>
            <el-button type="warning"
              plain
              size="mini"
              v-if="isModification"
              icon="el-icon-refresh"
              @click="cancel">取消</el-button>
            <el-button size="mini"
              type="primary"
              plain
              icon="el-icon-edit"
              @click="modify">{{isModification? '修改': '编辑'}}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-dialog title="记录详情"
      :visible.sync="dialogFormVisible">
      <el-form :model="recordingDetail">
        <el-form-item :label-width="formLabelWidth">
          <el-tag>
            <i class="el-icon-time"></i>
            时间
          </el-tag>
          <p>{{recordingDetail.timestamp | Date}}</p>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-tag>
            <i class="el-icon-document"></i>
            内容
          </el-tag>
          <p>{{recordingDetail.content || '暂无内容'}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button type="primary"
          @click="dialogFormVisible = false"
          size="small">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      isModification: false,
      dialogFormVisible: false,
      formLabelWidth: '80px'
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
    },
    recordingDetail () {
      this.dialogFormVisible = true
    }
  },
  computed: {
    ...mapGetters({
      broadForEdit: 'broadForEdit',
      updateRecordingResult: 'updateRecordingResult',
      recordingDetail: 'recordingDetail'
    })
  },
  methods: {
    ...mapActions({
      getRecordingById: 'getRecordingById',
      updateRecording: 'updateRecording',
      getRecordingDetail: 'getRecordingDetail'
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
    },
    showDetail (id) {
      this.getRecordingDetail(id)
    }
  },
  mounted () {
    this.getRecordingById(this.$route.params.id)
  }
}
</script>
