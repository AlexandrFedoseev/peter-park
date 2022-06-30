export default {
    add(state, item) {
        state.list.push(item)
    },
    set(state, items) {
        state.list = [...items]
    },
  
    toggle(state, item) {
        item.enabled = !item.enabled
    }
  }