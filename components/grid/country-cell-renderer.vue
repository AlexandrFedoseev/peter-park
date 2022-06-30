<template lang="pug">
div
    img.flag-icon(:src="require(`~/static/icons/${data.toLowerCase()}.png`)")
    span {{ data }}
</template>

<style lang="scss">
.flag-icon {
    max-height: 20px;
    position: relative;
    top: 5px;
    margin-right: 6px;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class CountryCellRenderer extends Vue {
    params;
    data;

    beforeMount() {
        this.data = this.params.value;
    }
}
</script>