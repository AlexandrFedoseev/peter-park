<style lang="scss" src="./form-styles.scss" />
<template lang="pug" src="./form-template.pug" />
<script lang="ts">
const LICENSE_PLATE_VALIDATOR = {
    Germany: new RegExp("[A-ZÄÖÜ]{1,3}\-[A-Z]{0,2}[ ]{0,1}[0-9]{1,4}[0-9]{0}[H]{0,1}$"),
    Switzerland: new RegExp("[A-Z]{1,3}\-[0-9]{1,6}$"),
    Austria: new RegExp("[A-Z]{1,2}\-[0-9]{3,6}$"),
    France:  new RegExp("[A-Z]{2}\-[0-9]{3}\-[A-Z]{2}$")
}
import { Vue, Component, Emit } from 'vue-property-decorator'
import Input from "@/components/input/Input.vue"

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
    dates = [];
    country = 'Germany';
    licensePlate = "";
    ownerName = "";

    onCountryChange() {
        this.$refs.form.validate();
    }

    cancelDatePicker() {
        this.dates = []
        this.isDatePicker = false
    }

    sendData() {
        if (!this.$refs.form.validate()) {
            return;
        }
        this.addContract({
            licensePlate: this.licensePlate,
            country: this.country,
            owner: this.ownerName ? this.ownerName : "",
            startDate: this.dates.length ? this.formatDate(this.dates[0]) : "",
            endDate: this.dates.length === 2 ? this.formatDate(this.dates[1]) : "",
            enabled: true
        });
    }

    public onDateBlur(event) {
        console.log("on Blur", event.target._value)
        //this.dates = this.dateRangeValues(this.dateFormatted)
    }

    public validateLicensePlate(value: string): boolean | string {
        console.log(this.country)
        return LICENSE_PLATE_VALIDATOR[this.country].test(value) || 'License Plate is not Valid.'
    }

    public validateRequired(value: string): boolean | string {
        return !!value || 'Required.'
    }

    public licensePlateRules = [
        this.validateRequired,
        this.validateLicensePlate
    ]
    public required = [
        this.validateRequired
    ]

    public countriesList = [
        'Germany', 'Switzerland', 'Austria', 'France'
    ]

    public isDatePicker = false

    public formatDate(date: string): string | null {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
    }
    public parseDate(date: string | null): string | null {
        if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

    public get dateRangeText(): string {
        return this.dates.map(this.formatDate).join(' ~ ')
    }

    public dateRangeValues(str: string): string {
        // dateRangeValues getter
        return ""
    }

    public dateFormatted = this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
    private async addContract(contract) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contract)
        };
        fetch("http://localhost:3001/contracts", requestOptions)
            .then(response => response.json())
            .then(this.updateData);
    }

    @Emit("new-contract")
    updateData(data) {
        console.log("POST", data)
        return data
    }
}
</script>
