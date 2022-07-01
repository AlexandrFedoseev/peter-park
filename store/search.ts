export const state = () => ({
  search: ''
})

export const mutations = {
  setInput (state, str) {
    state.search = str
  }
}

export const getters = {
  getInput (state) {
    return state.search
  }
}
