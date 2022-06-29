<style lang="scss" src="./form-styles.scss" />
<template lang="pug" src="./form-template.pug" />
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Input from "@/components/input/Input.vue"

@Component({
    components: {
        Input
    }
})
export default class Form extends Vue {
    mounted() {

    }

    public dates = []

    public licensePlateRules = [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
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
    public parseDate(date: string): string | null {
        if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

    public get dateRangeText(): string {
        return this.dates.map(this.formatDate).join(' ~ ')
    }

    public dateFormatted = this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
}
</script>
