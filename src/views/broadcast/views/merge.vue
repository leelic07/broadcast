<template>
  <el-row class="merge-container">
    <el-col :span="16"
      :offset="4">
      <el-card>
        <el-col>
          <el-button type="text"
            icon="el-icon-back"
            @click="back">返回</el-button>
          <h2>
            <i class="el-icon-menu"></i>
            合并记录
          </h2>
        </el-col>
        <el-form>
          <el-form-item v-for="(record,index) in checkedRecording"
            :key="index">
            <el-tag type="success">
              <i class="el-icon-service"></i>
              {{record.timestamp | Date}}
            </el-tag>
            <p class="broadcast-content">{{record.content || '暂无记录'}}</p>
          </el-form-item>
          <el-col>
            <el-tag>
              <i class="el-icon-document"></i>
              合并内容
            </el-tag>
          </el-col>
          <el-form-item>
            <el-input type="textarea"
              v-model="contents"
              :autosize="{minRows: 4,maxRows: 35}"
              size="medium"
              :disabled="true"></el-input>
            <!-- <p v-for="(record,index) in checkedRecording" :key="index">
                        {{record.content}}
                    </p> -->
          </el-form-item>
          <el-col>
            <el-tag>
              <i class="el-icon-download"></i>
              下载地址
            </el-tag>
          </el-col>
          <el-form-item>
            <el-button icon="el-icon-download"
              type="text"
              @click="downloadWord">点击下载合并记录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      checkedRecording: 'checkedRecording',
      contents: 'contents',
      downloadUrl: 'downloadUrl'
    })
  },
  methods: {
    back () {
      this.$router.push({ path: '/broadcast' })
    },
    downloadWord () {
      window.location.href = `${this.$_baseURL}${this.downloadUrl}`
    }
  }
}
</script>
