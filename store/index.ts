export const state = () => ({
    count: 0
})

export const getters = {
    getCount: state => state.count,
  }

export const mutations = {
    increment(state) {
        state.count++
    }
}