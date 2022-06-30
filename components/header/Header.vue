<script lang=ts>
import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import debounce from 'debounce'

@Component({
  computed: {
    ...mapGetters({
      searchString: 'search/getInput'
    })
  }
})
export default class Header extends Vue {
  searchString!: string
  setInput!: (value) => void

  onInput (event: string) {
    this.$store.commit('search/setInput', event)
  }

  debounceInput = debounce(this.onInput, 500)
}
</script>
<template  lang=pug src=./header-template.pug />
<style lang=scss src=./header-styles.scss />
