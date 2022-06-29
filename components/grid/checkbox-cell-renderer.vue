<template lang="pug">
v-checkbox.in-grid-checkbox(
        v-model="data"
        @click="checkedHandler"
    )
</template>

<style lang="scss">
.in-grid-checkbox {
    margin: 0;
}
</style>



<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component
export default class CheckboxCellRenderer extends Vue {
    public params
    public data
    beforeMount() {
        this.data = this.params.value
    }
    public checkedHandler(event) {
        this.params.setValue(this.data)
    }
}
</script>