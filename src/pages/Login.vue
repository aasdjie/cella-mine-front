<template lang="pug">
div
  v-dialog(:value='true', persistent='', max-width="400px")
    v-card(hover='', class='white')
      v-flex.deep-purple.darken-1
        v-card-title.white--text
          .text-xs-center  {{$t("Login")}}
      v-flex
        v-card-text.pt-4
          v-form(v-model='model', action='login', :fields='fields', @success='onSuccess', submitButtonText="Login")
            .flex.pb-2
              small {{$t("* Indicates required field")}}
</template>

<style>
  body{
    background: #666 !important;
  }
</style>

<script>
import {request, get, api, post } from '../api'
export default {

  data () {
    return {
      model: {
        username: 'admin',
        password: '123456'
      },

      fields: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' }
      },
      rules: {
        
      },
      show: true
    }
  },
  methods: {
    onSuccess (data) {
      this.getAuth()
      this.$router.push('/')
    },
    getAuth () {
      const url = api({ client_id: 0 }).login
      get(url, {}, {
        success: res => {
          this.$store.commit('setAuth', data)
          this.$router.push('/')
        },
        error: res => {
          // this.$showModal('请求失败！')
        }
      })
    }
  },

  mounted () {
  }
}
</script>
