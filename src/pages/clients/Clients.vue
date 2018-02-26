<template>
  <div>
    <v-breadcrumbs divider="/">
      <v-breadcrumbs-item 
        v-for="item in crumbs" :key="item.text"
        :disabled="item.disabled"
      >
        {{ $t(item.text) }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-form class="row jr" :inline='true' v-model='filters.model' v-if="filters.fields" :fields='filters.fields' @submit='doSearch' submitButtonText='Search' submitButtonIcon='search'></v-form>
    <v-card>
      <v-data-table
        v-bind:headers='headers'
        v-bind:items='clients'
        v-bind:search='search'
        v-bind:pagination.sync='pagination'
        hide-actions
        :loading='loading.clients'
        class='clients'
      >
        <template slot='headerCell' slot-scope='props'>
            <span>
              {{ props.header.text }}
            </span> 
        </template>
        <template slot='items' slot-scope='props'>
          <td class='text-xs-left'>{{ props.item.city }}</td>
          <td class='text-xs-right'>{{ props.item.location }}</td>
          <td class='text-xs-right'>{{ props.item.media_type }}</td>
          <td class='text-xs-right'>{{ props.item.size }}</td>
          <td class='text-xs-right'>{{ props.item.resolution }}</td>
          <td class='text-xs-right'>
            <span v-if='props.item.status==0'>未提交</span>
            <span v-if='props.item.status==1'>审批失败</span>
            <span v-if='props.item.status==2'>审批成功</span>
          </td>
          <td class='text-xs-center'> 
            <v-btn fab flat color='primary' small :to="{name: 'clientDetail', params: {id:props.item.id}}">
              <v-icon color='primary'>remove_red_eye</v-icon>
            </v-btn> 
            <v-btn fab flat color='primary' small @click="deleteClient(props.item.id)">
              <v-icon color='primary'>delete</v-icon>
            </v-btn> 
          </td>
        </template>
      </v-data-table>
      <div class=' text-xs-center pt-2'>
        <v-pagination class="ma-3" v-model='pagination.page' :length='pages'></v-pagination>
      </div>
    </v-card>
    
  </div>
</template>
<script>
import {request, get, api } from '../../api'
import options from '../../api/options'
import { mapState, mapMutations, mapGetters} from 'vuex'
export default {
  data () {
    return {
      search: '',
      form: {
        model: {},
        fields: {},
        rules: {},
        messages: {}
      },
      filters: {
        model: {},
        fields: null
      },
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: 'id',
        descending: true,
        totalItems: 0
      },
      selected: [],
      loading: {
        clients: false
      },
      headers: [
        {
          text: '城市',
          align: 'left',
          value: 'city'
        },
        { text: '位置', value: 'location' },
        { text: '媒体类型', value: 'media_type' },
        { text: '尺寸', value: 'size' },
        { text: '分辨率', value: 'resolution' },
        { text: '状态', value: 'status' },
        { text: '操作', align: 'center', sortable: false }
      ],
      clients: [],
      crumbs: [
          {
            text: 'Client',
            disabled: false
          },
          {
            text: 'Clients',
            disabled: false
          }
        ]
    }
  },
  computed: {
    ...mapState(['message', 'menu', 'pageTitle']),
    path () {
      return this.$route.params.path
    },
    pages () {
      return this.pagination.rowsPerPage
        ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        : 0
    }
  },
  created () {
    this.getClients()
    this.fetchGrid()
  },
  methods: {
    ...mapMutations(['showMessage']),
    fetchForm (item) {
      this.$http.get(`${this.path}/form`, {
        params: {id: item.id}
      }).then(({data}) => {
        this.form = data
      })
    },
    fetchGrid () {
       this.filters.fields = options.clients.filters.fields
    },
    doSearch () {
      this.pagination.page = 1
      this.getClients()
    },
    getClients () {
      const url = api({ client_id: 0 }).client.list
      this.loading.clients = true
      get(url, {}, {
        success: res => {
          
          this.clients = res.data.data
          this.pagination.totalItems = this.clients.length
          this.loading.clients = false
          // const data = {type:'success', body:'成功113', color:'primary', icon: 'check_circle'}
          // this.$store.commit('showMessage', data)
        },
        error: res => {
          this.$showModal('请求失败！')
          this.loading.clients = false
        }
      })
    },
    deleteClient (id) {
      const url = api({ client_id: id }).client.update
      this.loading.clients = true
      request('delete', {
        url:url
      }).then(res => {
        // this.$showModal('删除成功')
        this.getClients()
        this.loading.clients = false
      }).catch(res => {
        // this.$showModal('请求失败！')
        this.loading.clients = false 
      })
    }
  }
}
</script>
