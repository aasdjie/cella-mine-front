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
        v-bind:items='sales'
        v-bind:search='search'
        v-bind:pagination.sync='pagination'
        hide-actions
        :loading='loading.sales'
        class='sales'
      >
        <template slot='headerCell' slot-scope='props'>
            <span>
              {{ $t(props.header.text) }}
            </span> 
        </template>
        <template slot='items' slot-scope='props'>
          <td class='text-xs-left'>{{ props.item.city}}</td>
          <td class='text-xs-left'>{{ props.item.location}}</td>
          <td class='text-xs-left'>{{ props.item.size}}</td>
          <td class='text-xs-left'>{{ JSON.stringify(props.item.media_type) }}</td>
          <td class='text-xs-left'>{{ props.item.selling_price}}</td>
          <td class='text-xs-left'>{{ props.item.buying_price}}</td>
          <td class='text-xs-left'>{{ props.item.consumer}}</td> 
        </template>
      </v-data-table>
      <div class=' text-xs-center pt-2'>
        <v-pagination class="ma-3" v-model='pagination.page' :length='pages'></v-pagination>
      </div>
    </v-card>
    
  </div>
</template>
<script>
import {request, get, api } from '../api'
import options from '../api/options'
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
        sales: false
      },
      headers: [],
      sales: [],
      crumbs: [
        {
          text: 'Client',
          disabled: false
        },
        {
          text: 'Sales',
          disabled: false
        }
      ]
    }
  },
  computed: {
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
    this.getSales()
  },
  methods: {
    fetchGrid () {
      this.headers = options.sales.columns
      this.filters.fields = options.sales.filters.fields
    },
    doSearch () {
      this.pagination.page = 1
      this.getSales()
    },
    getSales () {
      const url = api({ client_id: 0 }).sales.list
      this.loading.sales = true
      get(url, {page_size:this.page_size, page:this.page}, {
        success: res => {
          this.sales = res.data.data
          // this.pagination.totalItems = this.sales.length
          this.page++
          this.loading.sales = false
        },
        error: res => {
          this.$showModal('请求失败！')
          this.loading.sales = false
        }
      })
    }
  }
}
</script>
