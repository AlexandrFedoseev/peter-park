<script lang=ts>
import { Vue, Component } from 'vue-property-decorator'
import Header from '@/components/header/Header.vue'
import Form from '@/components/form/Form.vue'
import Grid from '@/components/grid/Grid.vue'
import { Contract } from '~/types/Contract.type'

@Component({
  components: {
    Header,
    Form,
    Grid
  }
})
export default class ClassAPICounter extends Vue {
  $refs!: {
    grid: Grid
  }

  onNewContract (data: Contract) {
    this.$refs.grid.addData(data)
  }
}
</script>
<template  lang=pug src=./index-template.pug />ss
<style lang=scss src=./index-styles.scss />
