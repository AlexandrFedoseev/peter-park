

<style lang="scss" src="./grid-styles.scss" />
<template lang="pug" src="./grid-template.pug" />
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { AgGridVue } from "ag-grid-vue";
import CheckboxCellRenderer from "./checkbox-cell-renderer.vue";
import { textMatcher, dateComparator } from "./grid-utils";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
    components: {
        AgGridVue,
    },
})
export default class Grid extends Vue {
    defaultColDef = {
        resizable: true,
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
        this.rowData.push(row)
    }

    frameworkComponents = {
        checkboxRenderer: CheckboxCellRenderer,
    };

    rowStyle = { height: "30px" };

    mounted() {
        this.getContracts();
    }

    private async getContracts() {
        const response = await fetch("http://localhost:3001/contracts");
        this.rowData = await response.json();
    }
}
</script>
