<template lang="pug">
div
  form(:action='action', @submit.prevent='onSubmit')
    v-tabs(grow, scroll-bars, v-model='active', v-if="groupBy")
      v-tabs-bar(slot='activators')
        v-tabs-item(v-for='(field, key) in group.parents', :key='key', :href="'tab-' + key", ripple)
        v-tabs-slider
      v-tabs-content(v-for='(fields, key) in group.children', :key='key', :id="'tab-' + key")
        v-card(flat)
          v-card-text
            v-field(v-for='(field, name) in fields', :key='name', :name="name", :field="field", v-model="model[name]")

    v-layout(v-bind="{[inline? 'row': 'column']: true}", v-if="!groupBy")
      
      v-field(v-for='(field, name) in fields', light, :key='name', :name="name", :field="field", v-model="model[name]").pl-2.pr-2
        
      v-alert.py-2(error, v-model='hasError')
        div(v-for='error in errors')  {{error.message}}
      slot
      v-flex.pt-2.actions(xs12)
        slot(name='buttons' v-if='submitButtonText')
          v-btn.ma-0( type='submit', :loading='saving') {{$t(submitButtonText)}}
            v-icon(right, dark, v-if="submitButtonIcon") {{submitButtonIcon}}
</template>

<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    groupBy: {
      required: false,
      type: String,
      default: null
    },
    action: {
      required: false,
      type: String,
      default: null
    },
    submitButtonText: {
      required: false,
      type: String,
      default: 'Submit'
    },
    submitButtonIcon: {
      required: false,
      type: String,
      default: 'send'
    },
    method: {
      required: false,
      type: String,
      default: 'post'
    },
    value: {
      required: false,
      type: Object,
      default: () => { }
    },
    fields: {
      required: true,
      type: Object
    },
    rules: {
      required: false,
      type: Object,
      default: () => { }
    },
    messages: {
      required: false,
      type: Object,
      default: () => { }
    },
    saving: {
      required: false,
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      model: this.value,
      hasError: false,
      errors: [],
      message: ''
    }
  },

  computed: {
    group () {
      if (!this.groupBy) {
        return null
      }
      let parents = {}
      let children = {}
      for (let k in this.fields) {
        let field = this.fields[k]
        let ref = field[this.groupBy]
        let parentKey = field.id
        if (ref === null) { // is parent
          parents[parentKey] = field
        } else { // is child
          if (!children[ref]) {
            children[ref] = {}
          }
          children[ref][k] = field
        }
      }
      return {parents, children}
    },

    autoSubmit () {
      return !!this.action
    }
  },
  watch: {
    'value' (val) {
      this.model = val
    },
    'model': 'updateFields'
  },
  methods: {

    getGroupedFields () { },
    getFieldError (fieldName) {
      for (let k in this.errors) {
        let error = this.errors[k]
        if (error.field === fieldName) {
          return error.message
        }
      }
    },
    updateFields () {

    },

    onSubmit () {
      const valid = global.validator.make(this.model, this.rules, this.messages)
      // this.$emit('success', {
      //       username: 'admin',
      //       password: '123456'
      //     })
      if (valid.passes()) {
        this.$emit('success', this.model)
      } else {
        const errors = valid.getErrors()
        this.hasError = true
        this.errors = errors
        this.$emit('error', errors)
        // this.$bus.showMessage('error', 'error')
      }
    }
  },
  mounted () {
    // this.$bus.showMessage('success', 'success')

  },
  created () {
    // global.validator.extend('unique', function (data, field, message, args, get) {
    //   return new Promise(function (resolve, reject) {
    //     // const fieldValue = get(data, field)
    //     return resolve('Unsupported in client.')
    //   })
    // }, this.$t('Field should be unique.'))
  }
}
</script>
