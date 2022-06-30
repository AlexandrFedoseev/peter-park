<style lang="scss" src="./header-styles.scss" />
<template  lang="pug" src="./header-template.pug" />
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters } from 'vuex';
import debounce from "debounce";

@Component({
    computed: {
        ...mapGetters({
            searchString: "search/getInput"
        })
    }
})
export default class Header extends Vue {
    searchString!: string;
    setInput!: (value) => void;

    mounted() {

    }
    onInput(e) {
        this.$store.commit("search/setInput", e);
    }
    debounceInput = debounce(this.onInput, 500);
}

</script>
