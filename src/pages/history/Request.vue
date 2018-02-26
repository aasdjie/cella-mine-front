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
        v-bind:items='requests'
        v-bind:search='search'
        v-bind:pagination.sync='pagination'
        hide-actions
        :loading='loading.requests'
        class='requests'
      >
        <template slot='headerCell' slot-scope='props'>
            <span>
              {{ $t(props.header.text) }}
            </span> 
        </template>
        <template slot='items' slot-scope='props'>
          <td class='text-xs-left'>{{ props.item.request_id }}</td>
          <td class='text-xs-left'>{{ props.item.city }}</td>
          <td class='text-xs-left'>{{ props.item.location }}</td>
          <td class='text-xs-left'>{{ props.item.media_type }}</td>
          <td class='text-xs-left'>{{ props.item.size }}</td>
          <td class='text-xs-left'>{{ (props.item.created_at).slice(0,10) }}</td>
          <td class='text-xs-left'>{{ props.item.material_url }}</td>
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
import { mapState } from 'vuex'
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
        requests: false
      },
      headers: [],
      requests: [],
      crumbs: [
        {
          text: 'History',
          disabled: false
        },
        {
          text: 'Requests',
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
    this.fetchGrid()
    this.getRequests()
  },
  methods: {
    fetchGrid () {
      this.headers = options.requests.columns
      this.filters.fields = options.requests.filters.fields
    },
    doSearch () {
      this.pagination.page = 1
      this.fetchData()
    },
    getRequests () {
      const url = api({ client_id: 0 }).request.list
      this.loading.requests = true
      get(url, {}, {
        success: res => {
          this.requests = res.data.data
          this.pagination.totalItems = this.requests.length
          this.loading.requests = false
        },
        error: res => {
          this.$showModal('请求失败！')
          this.loading.requests = false
        }
      })
    }
  }
}
</script>
