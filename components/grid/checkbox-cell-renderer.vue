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
    params;
    data;
    beforeMount() {
        this.data = this.params.value;
    }
    checkedHandler() {
        this.$store.commit('contracts/toggle', this.params.data);
        this.sendUpdate();
    }

    private async sendUpdate() {
        const { id, enabled } = this.params.data;
        const data = await this.$http.$patch(`http://localhost:3001/contracts/${id}`, { enabled });
        console.log("sendUpdate", data);
    }
}
</script>