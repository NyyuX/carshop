<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="广告名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="广告商">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="投放截止时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="立即上线">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="投放金额">
        <el-col :span="11">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="计划播放次数">
        <el-col :span="11">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="广告链接">
        <el-col :span="11">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="广告描述">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      this.$router.replace({ name:'ad-empty' })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push({ name: 'ad-table' })
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

