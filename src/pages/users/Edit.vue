
<template lang="pug">
div
  //- v-breadcrumbs(divider="/")
  //-   v-breadcrumbs-item(v-for="item in crumbs" :key="item.text"
  //-     :disabled="item.disabled") {{ $t(item.text) }}
  v-layout
    v-flex(xs8)
      v-form(v-model="model", v-bind="$data", :method="method", v-if="fields", :fields='fields',:action="action", @success="onSuccess")
        div(slot="buttons",class="my-4")
          v-btn(dark, class="grey", @click.native="$root.back()") 
            v-icon(dark, left) chevron_left 
            span {{$t('Back')}}
          v-btn(primary, dark, type='submit') {{$t('Submit')}}
            v-icon(right, dark) send
</template>

<script>
import options from '../../api/options'
import {get, update, api } from '../../api'
export default {

  data () {
    return {
      model: {},
      fields: {},
      rules: {},
      messages: {}
    }
  },
  computed: {
    method () {
      return this.isEdit ? 'patch' : 'post'
    },
    action () {
      if (this.isEdit) {
        return `${this.path}/${this.id}`
      } else {
        return `${this.path}`
      }
    },
    isEdit () {
      return !!this.id
    },
    path () {
      return this.$route.params.path
    },
    id () {
      return this.$route.params.id
    }

  },
  watch: {
    '$route': 'fetch',
    'model': 'updateFields'
  },
  methods: {
    getFieldError (fieldName) {
      for (let k in this.errors) {
        let error = this.errors[k]
        if (error.field === fieldName) {
          return error.message
        }
      }
    },
    getUsers () {
      const url = api({ client_id: 0 }).users.list
      this.loading.users = true
      get(url, {}, {
        success: res => {
          // this.users = res.data.data
          this.pagination.totalItems = this.users.length
          this.loading.users = false
        },
        error: res => {
          this.loading.users = false
        }
      })
    },
    update (data) {
      const url = api({ client_id: data.id }).users.update
      this.form.saving = true
      post(url, data, {
        success: res => {
          // this.users = res.data.data
          this.form.model = {}
          this.form.saving = false
          this.hideCreate()
        },
        error: res => {
          this.form.saving = false
        }
      })
    },
    fetchForm () {
      this.fields = options.users.form.fields
      this.model = options.users.form.model
      // this.rules = data.rules
      // this.messages = data.messages
    },
    onSubmit () {
      
    },
    onSuccess (data) {
      this.$router.push({name: 'grid', params: {path: this.path}})
    
    }
  },
  created () {
    let pageTitle = (this.isEdit ? 'Update' : 'Create') + ' ' + global.helper.i.titleize(global.helper.i.singularize(this.path))
    console.log('pageTitle==',pageTitle)
    this.$store.commit('setPageTitle', pageTitle)
  },
  mounted () {
    // this.$bus.showMessage('success', 'success')
    this.fetchForm()
    this.getUsers()
  }
}
</script>
