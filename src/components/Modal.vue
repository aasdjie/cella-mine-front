<template>
  <v-dialog v-model="show" :max-width="width" :color="color">
    <v-card>
      <v-flex v-if="title">
        <v-card-title>{{title}}</v-card-title>
      </v-flex> 
        <v-card-text v-if="body">{{body}}</v-card-text> 
      <v-flex actions>
        <v-btn class="green--text darken-1" flat="flat" @click.native="onCancel" v-if="cancel">{{cancel}}</v-btn>
        <v-btn class="green--text darken-1" flat="flat" @click.native="onOk" v-if="ok">{{ok}}</v-btn>
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: null
    },
    width: {
      type: String,
      required: false,
      default: '450px'
    },
    body: {
      type: String,
      required: false,
      default: null
    },
    color: {
      type: String,
      required: false,
      default: 'light'
    },
    ok: {
      type: String,
      required: false,
      default: 'Ok'
    },
    cancel: {
      type: String,
      required: false,
      default: 'Cancel'
    }

  },
  data () {
    return {
      show: this.value
    }
  },
  watch: {
    value (val) {
      this.show = val
    }
  },
  methods: {
    onOk () {
      this.$emit('success')
    },
    onCancel () {
      this.$emit('cancel') 
    }
  }
}

</script>
