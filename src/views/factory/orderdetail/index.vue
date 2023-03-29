<template>
  <div class="app-container">
    <template>
      <div>
        <!--插入可视化数据图-->
        <template>
          <h2>车主信息</h2>
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
                             label="车牌"
                             align="center">
            </el-table-column>
            <el-table-column prop="name"
                             label="手机"
                             align="center">
            </el-table-column>
            <el-table-column prop="name"
                             label="取货时间"
                             align="center">
            </el-table-column>
            <el-table-column prop="name"
                             label="备注"
                             align="center">
            </el-table-column>
          </el-table>
        </template>
        <template>
          <h2>商品列表</h2>
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
                             label="型号"
                             width="110"
                             align="center">
            </el-table-column>
            <el-table-column prop="address"
                             label="售价"
                             align="center">
            </el-table-column>
            <el-table-column prop="address"
                             label="数量"
                             align="center">
            </el-table-column>
            <el-table-column prop="address"
                             label="小计"
                             align="center">
            </el-table-column>
          </el-table>
        </template>
        <template>
          <h2>订单信息</h2>
          <p>订单号码:{{}}</p>
          <p>下单时间：{{}}</p>
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
