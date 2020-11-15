import { ADD_COUNTER, ADD_TO_CART, SET_CHECK_STATE, SET_SELECT_ALL } from '@/store/mutation-types.js'
export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  },
  [SET_CHECK_STATE](state, payload) {
    payload.checked = !payload.checked
  },
  [SET_SELECT_ALL](state) {
    const selectAll = !state.cartList.find(item => !item.checked)
    if (selectAll) {
      state.cartList.forEach(item => {
        item.checked = false
      })
    }
    else {
      state.cartList.forEach(item => {
        item.checked = true
      })
    }
  },
}