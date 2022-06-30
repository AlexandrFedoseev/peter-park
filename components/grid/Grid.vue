

<style lang="scss" src="./grid-styles.scss"></style>
<template lang="pug" src="./grid-template.pug" />
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapGetters } from 'vuex';
import { AgGridVue } from "ag-grid-vue";
import CheckboxCellRenderer from "./checkbox-cell-renderer.vue";
import CountryCellRenderer from "./country-cell-renderer.vue";
import HighlightCellRenderer from "./highlight-cell-renderer.vue";

import { textMatcher, dateComparator } from "./grid-utils";
import { GridApi } from "ag-grid-community";

@Component({
    components: {
        AgGridVue,
    },
    computed: {
        ...mapGetters({
            rowData: "contracts/getContracts",
            searchString: "search/getInput"
        })
    }
})
export default class Grid extends Vue {
    searchString!: string;
    defaultColDef = {
        resizable: true,
        suppressNavigable: true,
        cellClass: 'no-border'
    };

    columnDefs = [
        {
            field: "licensePlate",
            sortable: true,
            cellStyle: { "font-weight": "bold", "line-height": "30px" },
            filter: "agTextColumnFilter",
            filterParams: {
                textMatcher,
            },
            cellRenderer: "highlightRender"
        },
        {
            field: "country",
            sortable: true,
            filter: "agTextColumnFilter",
            cellRenderer: "countryRenderer",
            filterParams: {
                textMatcher,
            },
            cellStyle: { "line-height": "30px" }
        },
        {
            field: "owner",
            sortable: true,
            filter: "agTextColumnFilter",
            filterParams: {
                textMatcher,
            },
            cellStyle: { "line-height": "30px" },
            cellRenderer: "highlightRender"
        },
        {
            field: "startDate",
            sortable: true,
            filter: "agDateColumnFilter",
            filterParams: {
                comparator: dateComparator,
            },
            cellStyle: { "line-height": "30px" }
        },
        {
            field: "endDate",
            sortable: true,
            filter: "agDateColumnFilter",
            filterParams: {
                comparator: dateComparator,
            },
            cellStyle: { "line-height": "30px" }
        },
        {
            field: "enabled",
            cellRenderer: "checkboxRenderer",
            cellStyle: { padding: "0", "padding-left": "10px" },
            sortable: true
        }
    ];
    rowData!: any[];

    addData(row) {
        this.$store.commit('contracts/add', row);
        setTimeout(() => {
            this.setRowSelected(row);
        })
    }

    frameworkComponents = {
        checkboxRenderer: CheckboxCellRenderer,
        countryRenderer: CountryCellRenderer,
        highlightRender: HighlightCellRenderer
    };

    rowStyle = { height: "30px" };

    mounted() {
        this.getContracts();
    }

    gridApi!: GridApi;

    onGridReady(params) {
        this.gridApi = params.api;
        window.addEventListener("resize", this.onWindowResize);
        this.onWindowResize();
    }

    onRowClicked({ node }) {
        node.setSelected(true);
    }

    setRowSelected(row) {
        this.gridApi.forEachNode((node) => {
            if (node.data.id === row.id) {
                node.setSelected(true);
                this.gridApi.ensureNodeVisible(node);
            }
        });
    }

    @Watch("searchString")
    externalFilterChanged(newValue) {
        this.gridApi.onFilterChanged();
    }

    isExternalFilterPresent() {
      return !!this.searchString;
    }
    doesExternalFilterPass(node) {
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
