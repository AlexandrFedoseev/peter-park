<style lang="scss" src="./header-styles.scss" />
<template  lang="pug" src="./header-template.pug" />
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'


@Component
export default class Header extends Vue {
  mounted() {
    console.log('mounted header')
  }
}




</script>
