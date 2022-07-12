export class Alert {
    alertText: string;
    alertCreated: Date;
    alertType?: string;
    alertDuration?: number;

    constructor(alerText: string, alertCreated: Date, alertType?: string, alertDuration?: number) {
        this.alertText = alerText;
        this.alertCreated = alertCreated;
        this.alertType = alertType;
        this.alertDuration = alertDuration;
    }

}