import { ADD_COUNTER, ADD_TO_CART, SET_CHECK_STATE, SET_SELECT_ALL } from '@/store/mutation-types.js'
import { isSelectedAll } from '@/store/getters.js'
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
      }
      else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
      }
      resolve('添加成功 在购物车等亲~')
    })
  },
  setCheckState(context, payload) {
    let product = context.state.cartList.find(item => item.iid === payload.iid)
    if (product) {
      context.commit(SET_CHECK_STATE, product)
    }
  },
  setSelectAll(context) {
    if (context.state.cartList.length === 0) return
    context.commit(SET_SELECT_ALL)
  },
}