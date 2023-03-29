<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="SKU">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="立即上线">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="型号">
        <el-col :span="11">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="库存">
        <el-col :span="11">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="图片链接">
        <el-col :span="11">
          <el-input v-model="form.name" />
        </el-col>
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
      this.$router.replace({ name:'goodsempty' })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push({ name: 'goodsform' })
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
