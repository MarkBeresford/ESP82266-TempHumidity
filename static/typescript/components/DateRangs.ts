export class DateRange{
    startDate: Date
    endDate: Date
    key: string

    constructor(
        startDate: Date,
        endDate: Date,
        key: string
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.key = key;
    }
}