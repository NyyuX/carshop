<template>
  <div class="app-container">
    <template>
      <el-button @click="showdetails" overflow:hidden>广告内容</el-button>
      <el-button @click="showresults" overflow:hidden>播放详情</el-button>
      <div>
        <el-main>

        </el-main>

        <!--插入可视化数据图-->
        <template>
          <el-row>
            <el-col :span="2"><div align="center" class="grid-content bg-purple">广告编号</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple-light"></div></el-col>

          </el-row>
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
    created() {
      console.log('created', this.$route)
      this.id=this.$route.params.myid
    },
    mounted() {
      console.log('mounted', this.$route.params.myid)
    },
    //created() {
    //  this.fetchData()
    //},
    methods: {
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      },
      showdetails(id) {
        this.$router.push({ name: 'ad-detail', params: { myid: id } })
      },
      showresults(id) {
        this.$router.push({ name: 'ad-result', params: { myid: id } }); console.log("111");   
      },
    }
  }
</script>


<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child

  {
    margin-bottom: 0;
  }

  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    align-content :center;
    align-items:center;
    align-self :center;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
