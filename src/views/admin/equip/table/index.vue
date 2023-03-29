<template>
  <div class="app-container">
    
    <el-button @click="activated()">已激活设备</el-button>
    <el-button @click="unactivated()">未激活设备</el-button>
    <el-button @click="all()">所有设备</el-button>

    <el-row>
      <el-input align="right"
                v-model="search"
                size="mini"
                placeholder="输入设备ID/车主姓名进行搜索" />
    </el-row><!--过滤器中ID/name   -->
    <el-table v-loading="listLoading"
              :data="list.filter(data => !search || data.author.toLowerCase().includes(search.toLowerCase())||data.status.toLowerCase().includes(search.toLowerCase()))"
              ref="filterTable"
              element-loading-text="Loading"
              style="width:100%"
              border
              fit
              highlight-current-row>

      <el-table-column align="center" label="设备序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column label="设备ID" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车主姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="车主手机" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="今日营业额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="当前位置" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" align="center" prop="status" :filters="[{text:'在线',value:'published'},{text:'离线',value:'gray'}]" :filter-method="online" filter-placement="bottom-end">
        <!--//value值待改-->
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showdetails(scope.row.author)" class="detailed">详情</el-button>
          <!--待改为设备ID-->
        </template>
      </el-table-column>

    </el-table>
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
      },
      hasactivated(type) {
        const statusobj = this.list.find(obj => obj.status === type)
        return statusobj?statusobj.status:null
      },
      unactivated() {

      },
      all() {
        this.a = false
        this.b = false
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        search: '',
        a: false,
        b:true
      }
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
      },
      online(value, row,column) {
        const property = column['property'];
        return row[property] === value;
      },
      showdetails(id){
        this.$router.push({name: 'equip-detail',params: {myid: id}})
      }
    }
  }
</script>
