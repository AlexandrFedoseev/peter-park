

<style lang="scss" src="./grid-styles.scss"></style>
<template lang="pug" src="./grid-template.pug" />
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapGetters } from 'vuex';
import { AgGridVue } from "ag-grid-vue";
import { textMatcher, dateComparator } from "./grid-utils";
import { GridApi, RowNode } from "ag-grid-community";
import CheckboxCellRenderer from "./checkbox-cell-renderer.vue";
import CountryCellRenderer from "./country-cell-renderer.vue";
import HighlightCellRenderer from "./highlight-cell-renderer.vue";
import { Contract } from "~/types/Contract.type";

@Component({
    components: {
        AgGridVue
    },
    computed: {
        ...mapGetters({
            rowData: "contracts/getContracts",
            searchString: "search/getInput"
        })
    }
})
export default class Grid extends Vue {
    gridApi!: GridApi;
    searchString!: string;
    defaultColDef = {
        resizable: true,
        sortable: true,
        suppressNavigable: true,
        cellClass: 'no-border',
        cellStyle: { "line-height": "30px" },
    }

    columnDefs = [
        {
            field: "licensePlate",
            cellStyle: { "font-weight": "bold", "line-height": "30px" },
            filter: "agTextColumnFilter",
            filterParams: { textMatcher },
            cellRenderer: "highlightRender"
        },
        {
            field: "country",
            filter: "agTextColumnFilter",
            cellRenderer: "countryRenderer",
            filterParams: { textMatcher }
        },
        {
            field: "owner",
            filter: "agTextColumnFilter",
            cellRenderer: "highlightRender",
            filterParams: { textMatcher }
        },
        {
            field: "startDate",
            filter: "agDateColumnFilter",
            filterParams: { comparator: dateComparator }
        },
        {
            field: "endDate",
            filter: "agDateColumnFilter",
            filterParams: { comparator: dateComparator }
        },
        {
            field: "enabled",
            cellRenderer: "checkboxRenderer",
            cellStyle: { padding: "0", "padding-left": "10px" },
            width: 95
        }
    ];
    rowData!: Contract[];

    frameworkComponents = {
        checkboxRenderer: CheckboxCellRenderer,
        countryRenderer: CountryCellRenderer,
        highlightRender: HighlightCellRenderer
    }

    rowStyle = { height: "30px" }

    mounted() {
        this.getContracts();
    }

    onGridReady(params) {
        this.gridApi = params.api;
        window.addEventListener("resize", this.onWindowResize);
        this.onWindowResize();
    }

    onRowClicked({ node }) {
        node.setSelected(true);
    }

    setRowSelected(row: Contract) {
        this.gridApi.forEachNode((node: RowNode) => {
            if (node.data.id === row.id) {
                node.setSelected(true);
                this.gridApi.ensureNodeVisible(node);
            }
        });
    }

    addData(row: Contract) {
        this.$store.commit('contracts/add', row);
        // Select Row on the next loop
        setTimeout(() => {
            this.setRowSelected(row);
        });
    }

    @Watch("searchString")
    externalFilterChanged(newValue: string) {
        this.gridApi.onFilterChanged();
    }

    isExternalFilterPresent(): boolean {
      return !!this.searchString;
    }
    doesExternalFilterPass(node: RowNode): boolean {
        return node.data.licensePlate.indexOf(this.searchString) != -1 ||
            node.data.owner.indexOf(this.searchString) != -1
    }

    onWindowResize() {
        if (window.innerWidth < 750) return;
        this.gridApi.sizeColumnsToFit();
    }

    destroyed() {
        window.removeEventListener("resize", this.onWindowResize);
    }

    private async getContracts() {
        const data = await this.$http.$get("http://localhost:3001/contracts");
        this.$store.commit('contracts/set', data);
    }
}
</script>
