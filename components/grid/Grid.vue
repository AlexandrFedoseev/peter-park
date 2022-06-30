

<style lang="scss" src="./grid-styles.scss"></style>
<template lang="pug" src="./grid-template.pug" />
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { AgGridVue } from "ag-grid-vue";
import CheckboxCellRenderer from "./checkbox-cell-renderer.vue";
import { textMatcher, dateComparator } from "./grid-utils";
import { GridApi } from "ag-grid-community";
import { runInThisContext } from "vm";

@Component({
    components: {
        AgGridVue,
    },
})
export default class Grid extends Vue {
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
        },
        {
            field: "country",
            sortable: true,
            filter: "agTextColumnFilter",
            filterParams: {
                textMatcher,
            },
            cellStyle: { "line-height": "30px" },
        },
        {
            field: "owner",
            sortable: true,
            filter: "agTextColumnFilter",
            filterParams: {
                textMatcher,
            },
            cellStyle: { "line-height": "30px" },
        },
        {
            field: "startDate",
            sortable: true,
            filter: "agDateColumnFilter",
            filterParams: {
                comparator: dateComparator,
            },
            cellStyle: { "line-height": "30px" },
        },
        {
            field: "endDate",
            sortable: true,
            filter: "agDateColumnFilter",
            filterParams: {
                comparator: dateComparator,
            },
            cellStyle: { "line-height": "30px" },
        },
        {
            field: "enabled",
            sortable: true,
            cellStyle: {
                "font-weight": "bold",
                "line-height": "30px",
                "text-align": "right",
            },
            width: 90,
        },
        {
            field: "enabled",
            headerName: "",
            cellRenderer: "checkboxRenderer",
            cellStyle: { padding: "0", "padding-left": "10px" },
            resizable: false,
            width: 45,
        },
    ];
    rowData: any[] = [];

    addData(row) {
        this.rowData.push(row);
        setTimeout(() => {
            this.setRowSelected(row);
        })
    }

    frameworkComponents = {
        checkboxRenderer: CheckboxCellRenderer,
    };

    rowStyle = { height: "30px" };

    mounted() {
        this.getContracts();
    }

    gridApi!: GridApi;

    onGridReady(params) {
        this.gridApi = params.api;
    }

    onRowClicked({ node }) {
        node.setSelected(true);
    }

    setRowSelected(row) {
        this.gridApi.forEachNode((node) => {
            if (node.data.id === row.id) {
                node.setSelected(true);
                this.gridApi.ensureNodeVisible(node)
            }
        });
    }

    private async getContracts() {
        this.rowData = await this.$http.$get("http://localhost:3001/contracts");
    }
}
</script>
