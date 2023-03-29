<template>
  <div class="app-container">
    <el-row><el-button type="primary" @click="addad()" class="detailed">新增广告</el-button></el-row>
    <el-row>

    </el-row>
    <el-input align="right"
              v-model="search"
              size="mini"
              placeholder="输入广告名称进行搜索" />
    <el-table v-loading="listLoading"
              :data="list.filter(data => !search || data.author.toLowerCase().includes(search.toLowerCase())||data.status.toLowerCase().includes(search.toLowerCase()))"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column label="广告编号" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告名称" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告主" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="投放金额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="截止日期" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="计划播放次数" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已播放次数" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="上下架" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status "
                     active-text="下线"
                     inactive-text="上线">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showdetails(scope.row.author)" class="detailed">详情</el-button>
        </template>
      </el-table-column>
      <!-- 操作详情跳转页面 -->

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
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        search:'',
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
      showdetails(id) {
        this.$router.push({ name: 'ad-detail', params: { myid: id } })
      },
      addad() {
        this.$router.push({ name: 'ad-add' })
      }
    }
  }
</script>
