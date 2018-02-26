<template>
  <v-app light>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
      v-show="!mini"
      class="pa-2 text-xs-center"
      dark
    > 
        <v-list two-line color="dark"> 
            <v-list-tile avatar >
              <v-list-tile-avatar>
                <v-icon>desktop_mac</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title >Mine</v-list-tile-title>
                <v-list-tile-sub-title >{{$t('An admin dashboard based on Vuetify')}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile> 
        </v-list>
        <!-- <div class="display-1 py-2"><v-icon>desktop_mac</v-icon> Mine</div> -->
        <!-- <p>{{$t('An admin dashboard based on Vuetify')}}</p>   -->
      <v-divider></v-divider>
      <v-list dense>
        <template v-for="item in menu" >
          <v-list-group v-if='item.items' :value="item.active" v-bind:key="item.title">
            <v-list-tile :to='item.href' slot='item' :title="item.title">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for='subItem in item.items' :key='subItem.href' :to='subItem.href' v-bind:router='!subItem.target'  ripple  v-bind:disabled='subItem.disabled' v-bind:target='subItem.target'>
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <v-subheader v-else-if='item.header' v-bind:key="item.title">
            {{ $t(item.header) }}
          </v-subheader>
          <v-divider v-else-if='item.divider' v-bind:key="item.title"></v-divider>
          <v-list-tile v-else :to='item.href' ripple  v-bind:disabled='item.disabled' :title="item.title" v-bind:key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if='item.subAction'>
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :class="theme" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{$t(pageTitle)}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn icon dark slot="activator"><v-icon dark>language</v-icon></v-btn>
        <v-list>
          <v-list-tile v-for="lang in locales" :key="lang" @mouseover.native="changeLocale(lang)">
            <v-list-tile-title>{{ lang }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <v-btn icon dark slot="activator"><v-icon dark>format_paint</v-icon></v-btn>
        <v-list>
          <v-list-tile v-for="n in colors" :key="n"  :class="n" @mouseover.native="theme = n"></v-list-tile>
        </v-list>
      </v-menu> 
    </v-toolbar>
    <v-content>
      <v-container fluid class="pa-4">
          <v-alert v-model="message.body"  type='message.type' color='message.color' icon='message.icon' dismissible class="py-2" transition="scale-transition">{{message.body}}</v-alert>
          <v-slide-y-transition mode='out-in'>
            <router-view/>
          </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer color="dark" app  :class="theme">
      <span class="white--text">&copy; 2017 Cella</span>
    </v-footer>
  </v-app>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      tile: true,
      avatarSize: '50px',
      dark: true,
      theme: 'primary',
      mini: false,
      drawer: true,
      locales: ['en-US', 'zh-CN'],
      colors: ['blue', 'green', 'purple', 'red', 'blue-grey']
    }
  },
  computed: {
    ...mapState(['message', 'menu', 'pageTitle'])
  },
  methods: {
    changeLocale (to) {
      global.helper.ls.set('locale', to)
      this.$i18n.locale = to
    },
    fetchMenu () {
      // fetch menu from server
      // this.$http.get('menu').then(({data}) => this.$store.commit('setMenu', data))
    }
  },

  created () {
    this.fetchMenu()
  }
}
</script>

