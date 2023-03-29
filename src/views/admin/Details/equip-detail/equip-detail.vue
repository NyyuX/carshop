<template>
  <div class="app-container">
    <template>
      <div>
        <!--插入可视化数据图-->
        <template>
          <p >设备信息</p>
          <el-table :data="tabledata"
                    height="90"
                    border
                    style="width: 100%"
                    >
            <el-table-column prop="SKU"align="center"
                             label="设备ID"
                             width="180">
            </el-table-column>
            <el-table-column prop="name"
                             label="激活时间"align="center"
                             width="180">
            </el-table-column>
            <el-table-column prop="address"align="center"
                             label="最近更新时间">
            </el-table-column>
            <el-table-column prop="address"align="center"
                             label="最新上报位置">
            </el-table-column>
          </el-table>
        </template>
        <template>
          <p>车主信息</p>
          <el-table :data="tabledata"
                    height="90"
                    border
                    style="width: 100%"
                    :key="goods">
            <el-table-column prop="SKU"
                             label="姓名"
                             align="center">
            </el-table-column>
            <el-table-column prop="name"
                             label="手机"
                             align="center">
            </el-table-column>
          </el-table>
        </template>
        <template>
          <p>商品信息</p>
          <el-table :data="tabledata"
                    height="250"
                    border
                    style="width: 100%"
                    :key="goods">
            <el-table-column prop="SKU"
                             label="SKU"
                             width="100"
                             align="center">
            </el-table-column>
            <el-table-column prop="name"
                             label="商品名称"
                             width="150"
                             align="center">
            </el-table-column>
            <el-table-column prop="address"
                             label="商品图片"
                             width="180"
                             align="center">
            </el-table-column>
            <el-table-column prop="address"
                             label="价格"
                             align="center">
            </el-table-column>
            <el-table-column prop="address"
                             label="月销量"
                             align="center">
            </el-table-column>
            <el-table-column prop="address"
                             label="库存"
                             align="center">
            </el-table-column>
            <el-table-column prop="address"
                             label="上下架"
                             align="center">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </template>

    
  </div>
</template>

<script>
  import { getList } from '@/api/table'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        id:'11',
        list: null,
        listLoading: true
      }
    },
    //created() {
    //  console.log('created', this.$route)
    //  this.id=this.$route.params.myid
    //},
    mounted() {
      console.log('mounted', this.$route.params.myid)
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      }
    }
  }
</script>

