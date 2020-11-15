export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  totalPrice(state) {
    return state.cartList
      .filter((item) => {
        return item.checked;
      })
      .reduce((pre, item) => {
        return pre + item.price * item.count;
      }, 0);
  },
  isSelectedAll(state) {
    if (state.cartList.length === 0) return false
    return !state.cartList.find(item => !item.checked)
  }
}