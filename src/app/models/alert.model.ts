export class Alert {
    alertText: string;
    alertCreated: Date;
    alertType?: string;

    constructor(alerText: string, alertCreated: Date, alertType?: string) {
        this.alertText = alerText;
        this.alertCreated = alertCreated;
        this.alertType = alertType;
    }

}