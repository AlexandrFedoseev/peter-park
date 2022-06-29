<style lang="scss" src="./index-styles.scss" />
<template  lang="pug" src="./index-template.pug" />
<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
@Component
export default class ClassAPICounter extends Vue {
  counter = 0
  increment () {
    this.counter++
  }
  decrement () {
    this.counter--
  }
}





</script>
