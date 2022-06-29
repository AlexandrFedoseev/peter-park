<style lang="scss" src="./input-styles.scss" />
<template  lang="pug" src="./input-template.pug" />
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'


@Component
export default class Input extends Vue {
    @Prop() readonly title!: string
    @Prop() readonly type!: "text"

    mounted() {
        console.log('mounted header')
    }
}




</script>
