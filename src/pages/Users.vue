<template>
  <div>
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
            <v-btn fab flat color='primary' small>
              <v-icon color='primary'>remove_red_eye</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <div class='text-xs-center pt-2'>
        <v-pagination v-model='pagination.page' :length='5'></v-pagination>
      </div>
    </v-card>
    
  </div>
</template>
<script>
import { get, api } from '../api'
export default {
  data () {
    return {
      search: '',
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
      clients: []
    }
  },
  computed: {
    pages () {
      return this.pagination.rowsPerPage
        ? Math.ceil(this.clients.totalItems / this.pagination.rowsPerPage)
        : 0
    }
  },
  created () {
    this.getClients()
  },
  methods: {
    getClients () {
    }
  }
}
</script>
