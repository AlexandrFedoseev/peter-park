<style lang="scss" src="./form-styles.scss" />
<template lang="pug" src="./form-template.pug" />
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import Input from "@/components/input/Input.vue";
const LICENSE_PLATE_VALIDATOR = {
    Germany: new RegExp("[A-ZÄÖÜ]{1,3}\-[A-Z]{0,2}[ ]{0,1}[0-9]{1,4}[0-9]{0}[H]{0,1}$"),
    Switzerland: new RegExp("[A-Z]{1,3}\-[0-9]{1,6}$"),
    Austria: new RegExp("[A-Z]{1,2}\-[0-9]{3,6}$"),
    France:  new RegExp("[A-Z]{2}\-[0-9]{3}\-[A-Z]{2}$")
};

@Component({
    components: {
        Input
    }
})
export default class Form extends Vue {
    $refs!: {
        form
    };

    isFormValid = true;
    isDatePicker = false;
    dates = [];
    country = 'Germany';
    countriesList = ['Germany', 'Switzerland', 'Austria', 'France'];
    countryRules = [
        this.validateRequired
    ];
    licensePlate = "";
    licensePlateRules = [
        this.validateRequired,
        this.validateLicensePlate
    ];
    ownerName = "";

    @Emit("new-contract")
    updateGridData(data) {
        this.resetFormData();
        return data;
    }

    onCountryChange() {
        this.$refs.form.validate();
    }

    onDatePickerCancel() {
        this.dates = [];
        this.isDatePicker = false;
    }

    sendData() {
        if (!this.$refs.form.validate()) return;
        this.addContract({
            licensePlate: this.licensePlate,
            country: this.country,
            owner: this.ownerName ? this.ownerName : "",
            startDate: this.dates.length ? this.formatDate(this.dates[0]) : "",
            endDate: this.dates.length === 2 ? this.formatDate(this.dates[1]) : "",
            enabled: true
        });
    }

    validateLicensePlate(value: string): boolean | string {
        return LICENSE_PLATE_VALIDATOR[this.country].test(value) || "License Plate is not Valid.";
    }

    validateRequired(value: string): boolean | string {
        return !!value || "Required.";
    }

    formatDate(date: string): string | null {
        if (!date) return null;
        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`;
    }

    parseDate(date: string | null): string | null {
        if (!date) return null;
        const [month, day, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    get dateRangeText(): string {
        return this.dates.map(this.formatDate).join(' ~ ');
    }

    dateRangeValues(str: string): string {
        // dateRangeValues getter
        return "";
    }
    private async addContract(contract) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contract)
        };
        fetch("http://localhost:3001/contracts", requestOptions)
            .then(response => response.json())
            .then(this.updateGridData);
    }

    private resetFormData() {
        this.isFormValid = true;
        this.dates = [];
        this.country = 'Germany';
        this.licensePlate = "";
        this.ownerName = "";
    }
}
</script>
