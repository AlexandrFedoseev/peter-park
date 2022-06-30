export default {
  add (state, item) {
    state.list.push(item)
  },
  set (state, items) {
    state.list = [...items]
  },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  toggle (state, item) {
    item.enabled = !item.enabled
  }
}
