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
    <v-layout>
      <v-flex md4></v-flex>
      <v-flex md8>  
        <v-form class="row jr" :inline='true' v-model='filters.model' v-if="filters.fields" :fields='filters.fields' @submit='getUsers' submitButtonText='Search' submitButtonIcon='search'></v-form>
      </v-flex>
    </v-layout>
    <v-card>
      <div> 
          <v-btn
            right
            top
            absolute
            color="primary"
            dark 
            fab 
            @click="showCreate"
            >
            <v-icon>add</v-icon>
          </v-btn> 
      </div>
      <v-data-table
        v-bind:headers='headers'
        v-bind:items='users'
        v-bind:search='search'
        v-bind:pagination.sync='pagination'
        hide-actions
        :loading='loading.users'
        class='users'
      >
        <template slot='headerCell' slot-scope='props'>
            <span>
              {{ $t(props.header.text) }}
            </span> 
        </template>
        <template slot='items' slot-scope='props'>
          <td class='text-xs-left'>{{ props.item.user_name }}</td>
          <td class='text-xs-left'>{{ props.item.phone }}</td> 
          <td class='text-xs-left'>{{ props.item.email  }}</td>
          <td class='text-xs-left'>{{ moment(props.item.created_at).format('YYYY-MM-DD HH:mm') }}</td>
          <td class='text-xs-center'>
            <v-btn flat icon  color='primary' @click="view(props.item.token)">
              <v-icon >visibility</v-icon>
            </v-btn>
          </td>
          <td class='text-xs-center'>
            <!-- <v-btn flat icon  color='primary' router :to="{name: 'userUpdate', params: {id:props.item.id}}">
              <v-icon >edit</v-icon>
            </v-btn> -->
            <v-btn flat icon  color='primary' @click="delUser(props.item)">
              <v-icon >delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <div class=' text-xs-center pt-2'>
        <v-pagination class="ma-3" v-model='pagination.page' :length='pages'></v-pagination>
      </div>
    </v-card>
    
    <!-- 提示弹窗 -->
    <v-dialog v-model="alert.show" :max-width="alert.width">
      <v-card class="pa-2">
        <v-flex v-if="alert.title">
          <v-card-title class='light-blue--text'><v-icon class="mr-1" v-if="alert.icon">alert.icon</v-icon> {{alert.title}}</v-card-title>
        </v-flex> 
        <v-card-text v-if="alert.body" :width="alert.width" class="break text-xs-center">{{alert.body}}</v-card-text> 
        <v-flex v-if="alert.ok" class="text-xs-center">
          <v-btn @click="alert.ok" class="orange accent-4 white--text">确定</v-btn>
        </v-flex>
      </v-card>
    </v-dialog>
    
    <!-- 创建新用户弹窗 -->
    <v-dialog v-model="modal.show" :max-width="modal.width">
      <v-card class="pa-3" color="dark lighten-4">
        <v-flex v-if="modal.title">
          <v-card-title>{{ $t(modal.title) }}</v-card-title>
        </v-flex> 
        <v-form class="pa-3 row jr" :inline='false' v-model='form.model' v-if="form.fields" :fields='form.fields' @success='create' submitButtonText='Confirm' submitButtonIcon='' :saving="form.saving"></v-form> 
      </v-card>
    </v-dialog>
    
  </div>
</template>
<script>
import {post, get, update, del, api } from '../../api'
import options from '../../api/options'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      search: '',
      form: {
        title: '',
        model: {},
        fields: {},
        rules: {},
        messages: {},
        saving: false
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
        users: false
      },
      headers: [],
      users: [],
      crumbs: [
        {
          text: 'Owner',
          disabled: false
        },
        {
          text: 'Clients Users',
          disabled: false
        }
      ],
      isAlert: false,
      newModal: false,
      alert: {
        title: '',
        body: '',
        icon: '',
        show: false,
        width: '450px',
        ok: null
      },
      modal:{
        title: '',
        body: '',
        show: false,
        width: '450px',
        fields: null
      }
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
    this.getUsers()
  },
  methods: {
    moment: moment,
    fetchGrid () {
      this.headers = options.users.columns
      this.filters.fields = options.users.filters.fields
      this.form = options.users.form 
    },
    doSearch () {
      this.pagination.page = 1
      this.getUsers()
    },
    showAlert (title, body, width, ok, icon) {
      this.alert.title = title
      this.alert.body = body
      width && (this.alert.width = width)
      console.log('typeof ok==',typeof ok)
      this.alert.ok = ok
      this.alert.icon = icon
      this.isAlert = true
      this.alert.show = true
    },
    hideAlert () {
      this.isAlert = false
      this.alert.show = false
    },
    showCreate () {
      this.modal.title = 'Create Owner'
      this.modal.show = true
    },
    hideCreate () {
      this.modal.show = false
    },
    create (data) {
      console.log('create data==',data)
      const url = api({ client_id: 0 }).users.create
      this.form.saving = true
      post(url, data, {
        success: res => {
          // this.users = res.data.data
          this.getUsers()
          this.form.model = {}
          this.form.saving = false
          this.hideCreate()
        },
        error: res => {
          this.form.saving = false
        }
      })
    },
    goEdit (id) {
      this.$router.push(`/admin/users/${id}`)
    },
    update (data) {
      console.log('create data==',data)
      const url = api({ user_id: id }).users.update
      this.form.saving = true
      post(url, {
        success: res => {
          this.getUsers()
          this.form.saving = false
        },
        error: res => {
          this.form.saving = false
        }
      })
    },
    delUser (user) {
      const url = api({ user_id: user.id }).users.update
      let tip = `确定要删除用户名为 ${user.user_name} 的用户吗？`

      this.showAlert('删除用户', tip, '450px', ()=>{
        console.log('I am del window')
        del(url, {
          success: res => {
            this.getUsers()
            this.hideAlert()
          },
          error: res => {
            this.form.saving = false
          }
        }),
        'help_outline'
      })
      
    },
    getUsers () {
      const url = api({ client_id: 0 }).users.list
      this.loading.users = true
      get(url, {}, {
        success: res => {
          this.users = res.data.data
          this.pagination.totalItems = this.users.length
          this.loading.users = false
        },
        error: res => {
          this.loading.users = false
        }
      })
    },
    view (str){
      this.showAlert('查看', str, '450px', null)
    }
  }
}
</script>