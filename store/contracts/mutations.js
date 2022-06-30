export default {
    add(state, item) {
        state.list.push(items)
    },
    set(state, items) {
        state.list = [...items]
    },
  
    toggle(state, item) {
        item.enabled = !item.enabled
    }
  }