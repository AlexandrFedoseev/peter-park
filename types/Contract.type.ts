export type Contract = {
    licensePlate: string,
    country: 'Germany' | 'Switzerland' | 'Austria' | 'France' | '',
    owner: string | null
    startDate: string | null,
    endDate: string | null,
    enabled: boolean,
    id?: number
}
