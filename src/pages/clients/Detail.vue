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
    <v-form class="row jr"  :inline='true' v-model='filters.model' v-if="filters.fields" :fields='filters.fields' @submit='doSearch' submitButtonText='' submitButtonIcon='search'></v-form>
    <v-card>
      <v-data-table
        v-bind:headers='headers'
        v-bind:items='prices'
        v-bind:search='search' 
        hide-actions
        :loading='loading.clients' 
      >
        <template slot='headerCell' slot-scope='props'>
            <span>
              {{ props.header.text }}
            </span> 
        </template>
        <template slot='items' slot-scope='props'>
          <td class='text-xs-left'>{{ props.item.adslot_id }}</td>
          <td class='text-xs-center'>{{ props.item.ad_type[0].type }}</td>
          <td class='text-xs-center'>{{ props.item.ad_type[0].duration }}</td> 
          <td class='text-xs-center'>{{ props.item.selling_price }}</td>
        </template>
      </v-data-table>
      <!-- <div class=' text-xs-center pt-2'>
        <v-pagination class="ma-3" v-model='pagination.page' :length='5'></v-pagination>
      </div> -->
    </v-card>
    
  </div>
</template>
<script>
import { get, api } from '../../api'
import options from '../../api/options'
import {mapState, mapMutations} from 'vuex'

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
      
      selected: [],
      loading: {
        prices: false
      },
      headers: [],
      prices: [],
      client: null,
      crumbs: [
          {
            text: 'Client',
            disabled: false
          },
          {
            text: 'Clients',
            disabled: false
          },
          {
            text: 'Clients Detail',
            disabled: false
          }
        ]
    }
  },
  computed: {
    // ...mapState(['pageTitle']),
    path () {
      return this.$route.params.path
    },
    id () {
      return this.$route.params.id
    }
  },
  created () {
    this.setPageTitle('Clients Detail')
    this.getItem()
    this.getPrices()
    this.fetchGrid()
  },
  methods: {
    ...mapMutations(['setPageTitle']),
    fetchForm (item) {
      this.$http.get(`${this.path}/form`, {
        params: {id: item.id}
      }).then(({data}) => {
        this.form = data
      })
    },
    fetchGrid () {
      this.filters.fields = options.prices.filters.fields
      this.headers = options.prices.columns
    },
    doSearch () {
      this.pagination.page = 1
      this.fetchData()
    },
    getItem () {
      const url = api({ client_id: this.id }).client.update
      this.loading.prices = true
      get(url, {}, {
        success: res => {
          // this.$showModal('加载成功！')
          this.client = res.data.data
          this.loading.clients = false
        },
        error: res => {
          this.loading.clients = false
        }
      })
    },
    getPrices () {
      const url = api({ client_id: this.id }).price.list
      this.loading.prices = true
      get(url, {}, {
        success: res => {
          // this.$showModal('加载成功！')
          this.prices = res.data.data
          this.loading.prices = false
        },
        error: res => {
          // this.$showModal('请求失败！')
          this.loading.prices = false
        }
      })
    }
  }
}
</script>
