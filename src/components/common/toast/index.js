import Toast from '@/components/common/toast/Toast'
const obj = {}

obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.根据组件构造器 new出组件对象
  const toast = new toastConstructor()
  // 3.将组件对象手动挂载到元素
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  // console.log(toast)

  Vue.prototype.$toast = toast
}
export default obj