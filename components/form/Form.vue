<style lang="scss" src="./form-styles.scss" />
<template lang="pug" src="./form-template.pug" />
<script lang="ts">
const LICENSE_PLATE_VALIDATOR = {
    Germany: new RegExp("[A-ZÄÖÜ]{1,3}\-[A-Z]{0,2}[ ]{0,1}[0-9]{1,4}[0-9]{0}[H]{0,1}$"),
    Switzerland: new RegExp("[A-Z]{1,3}\-[0-9]{1,6}$"),
    Austria: new RegExp("[A-Z]{1,2}\-[0-9]{3,6}$"),
    France:  new RegExp("[A-Z]{2}\-[0-9]{3}\-[A-Z]{2}$")
}
import { Vue, Component, Watch } from 'vue-property-decorator'
import Input from "@/components/input/Input.vue"

@Component({
    components: {
        Input
    }
})
export default class Form extends Vue {
    
    mounted() {

    }
    public formValues = {
        licensePlate:  ""
    }
    public dates = []
    country = 'Germany'
    licensePlate = ""

    ownerName = ""


    public cancelDatePicker = () => {
        this.dates = []
        this.isDatePicker = false
    }

    sendData() {
        console.log({
            country: this.country,
            dates: this.dates,
            owner: this.ownerName,
            plate: this.licensePlate
        }, this.formValues)
    }

    public onDateBlur(event) {
        console.log("on Blur", event.target._value)
        //this.dates = this.dateRangeValues(this.dateFormatted)
    }

    public licensePlateRules = [
        value => !!value || 'Required.',
        (value) => {
            return !!this.country || 'Select the Country.'
        },
        (value) => {
            console.log(this.dates)
            return LICENSE_PLATE_VALIDATOR[this.country].test(value) || 'License Plate is not Valid.'
        },
        value => (value && value.length >= 3) || 'Min 3 characters',
    ]
    public required = [
        value => !!value || 'Required.'
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
        return this.dates.map(this.formatDate).join(' ~ ')
    }

    public dateFormatted = this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
}
</script>
