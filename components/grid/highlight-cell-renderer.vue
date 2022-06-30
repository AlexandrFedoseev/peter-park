<template lang="pug">
div
    span(v-if="isNoHighlight") {{ data }}
    template(v-if="!isNoHighlight")
        span(v-for="(item, index) in data")
            span {{ item }}
            span.highlight-search(v-if="index < data.length - 1") {{ searchString }}
</template>

<style lang="scss">
.highlight-search {
    background-color: yellow;
}
</style>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapGetters } from 'vuex';

@Component({
    computed: {
        ...mapGetters({
            searchString: "search/getInput"
        })
    }
})
export default class HighlightCellRenderer extends Vue {
    searchString!: string;
    isNoHighlight = true;
    params;
    data;

    beforeMount() {
        this.renderData();
    }

    @Watch("searchString")
    renderData() {
        if (this.searchString === "") {
            this.isNoHighlight = true;
            this.data = this.params.value;
            return;
        }
        const split = this.params.value.split(this.searchString);
        if (split.length === 1) {
            this.isNoHighlight = true;
            this.data = this.params.value;
            return;
        }
        this.isNoHighlight = false;
        this.data = split;
    }
}
</script>