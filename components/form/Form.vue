<style lang="scss" src="./form-styles.scss" />
<template  lang="pug" src="./form-template.pug" />
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Input from "@/components/input/Input.vue"

@Component({
    components: {
        Input
    }
})
export default class Form extends Vue {
  mounted() {
    console.log('mounted form')
  }
}




</script>
