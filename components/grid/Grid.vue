<style lang="scss" src="./grid-styles.scss" />
<template lang="pug" src="./grid-template.pug" />
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { AgGridVue } from "ag-grid-vue"; // the AG Grid Vue Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS

@Component({
  components: {
    AgGridVue,
  },
})
export default class Grid extends Vue {
  private textMatcher = ({ filter, value, filterText }) => {
    const filterTextLowerCase = filterText.toLowerCase()
    const valueLowerCase = value.toString().toLowerCase()
    switch (filter) {
      case "contains":
        return valueLowerCase.indexOf(filterTextLowerCase) >= 0
      case "notContains":
        return valueLowerCase.indexOf(filterTextLowerCase) === -1
      case "equals":
        return valueLowerCase === filterTextLowerCase;
      case "notEqual":
        return valueLowerCase != filterTextLowerCase;
      case "startsWith":
        return valueLowerCase.indexOf(filterTextLowerCase) === 0
      case "endsWith":
        var index = valueLowerCase.lastIndexOf(filterTextLowerCase)
        return (
          index >= 0 &&
          index === valueLowerCase.length - filterTextLowerCase.length
        )
      default:
        // should never happen
        console.warn("invalid filter type " + filter)
        return false
    }
  };

  private dateComparator = (filterLocalDateAtMidnight, cellValue) => {
    const dateAsString = cellValue;

    if (dateAsString == null) {
      return 0;
    }

    // In the example application, dates are stored as dd/mm/yyyy
    // We create a Date object for comparison against the filter date
    const dateParts = dateAsString.split("/")
    const day = Number(dateParts[1])
    const month = Number(dateParts[0]) - 1
    const year = Number(dateParts[2])
    const cellDate = new Date(year, month, day)

    // Now that both parameters are Date objects, we can compare
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    } else if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  };

  public columnDefs = [
    {
        field: "licensePlate",
        sortable: true,
        cellStyle: {"font-weight": 'bold', 'line-height': '30px'},
        filter: "agTextColumnFilter",
        filterParams: {
            textMatcher: this.textMatcher,
        },
    },
    {
        field: "country",
        sortable: true,
        filter: "agTextColumnFilter",
        filterParams: {
            textMatcher: this.textMatcher,
        },
        cellStyle: {'line-height': '30px'}
    },
    {
        field: "owner",
        sortable: true,
        filter: "agTextColumnFilter",
        filterParams: {
            textMatcher: this.textMatcher,
        },
        cellStyle: {'line-height': '30px'}
    },
    {
        field: "startDate",
        sortable: true,
        filter: 'agDateColumnFilter',
        // add extra parameters for the date filter
        filterParams: {
            // provide comparator function
            comparator: this.dateComparator
        },
        cellStyle: {'line-height': '30px'}
    },
    {
        field: "endDate",
        sortable: true,
        filter: 'agDateColumnFilter',
        // add extra parameters for the date filter
        filterParams: {
            // provide comparator function
            comparator: this.dateComparator
        },
        cellStyle: {'line-height': '30px'}
    },
    {
        field: "enabled",
        sortable: true,
        cellStyle: {"font-weight": 'bold', 'line-height': '30px'}
    },
  ];
  public rowData = [
    {
      licensePlate: "HRO-D 819",
      country: "Germany",
      owner: "Nico Probst",
      startDate: "03/03/2022",
      endDate: "09/12/2022",
      enabled: true,
    },
    {
      licensePlate: "FRW-J 274",
      country: "Germany",
      owner: "Carsten Schroeder",
      startDate: "04/05/2022",
      endDate: "06/30/2022",
      enabled: true,
    },
    {
      licensePlate: "PI-MM 119",
      country: "Germany",
      owner: "Jonas Frenz",
      startDate: "06/29/2022",
      endDate: "07/01/2022",
      enabled: true,
    },
  ];

  mounted() {
    console.log("mounted grid");
  }

  public rowStyle = { height: '30px' };
}
</script>
