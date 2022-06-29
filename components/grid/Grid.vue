<style lang="scss" src="./grid-styles.scss" />
<template  lang="pug" src="./grid-template.pug" />
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'


@Component
export default class Grid extends Vue {
  mounted() {
    console.log('mounted grid')
  }
}




</script>
