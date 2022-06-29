<style lang="scss" src="./index-styles.scss" />
<template  lang="pug" src="./index-template.pug" />
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from "@/components/header/Header.vue"
import Form from "@/components/form/Form.vue"
import Grid from "@/components/grid/Grid.vue"


@Component({
  components: {
    Header,
    Form,
    Grid
  }
})
export default class ClassAPICounter extends Vue {
  public counter = 0

  mounted() {
    console.log('mounted')
    this.counter = 0
  }
  public increment(): void {
    this.counter++
  }
  decrement(): void {
    this.counter--
  }
}





</script>
