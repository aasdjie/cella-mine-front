import VModal from './Modal.vue'

const install = (Vue, Options) => {
  Vue.component('v-modal', VModal)
  const ModalComponent = Vue.extend(VModal)
  let component = new ModalComponent().$mount()
  const $app = () => { return document.getElementById('app') }
  Vue.prototype.$showModal = (title, text, width, success, ok, cancel, color) => {
    component.title = title
    component.body = text
    component.width = width 
    color && (component.color = color)

    cancel && (component.cancel = cancel)
    ok && (component.ok = ok)
    component.success = success

    component.value = true
    $app().appendChild(component.$el)
  }
  Vue.prototype.$closeModal = () => {
    $app().removeChild(component.$el)
  }
}

export default {
  install
}
