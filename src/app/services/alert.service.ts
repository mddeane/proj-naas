import { Injectable } from '@angular/core';
import { Alert } from '../models/alert.model';
Alert
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alerts: Alert[] = [];

  alertCounter: number = 1;
  alertDefaultDuration: number = 2000;

  showAlert(alertMessage: string, alertType?: string, alertDuration?: number) {

    if (!alertType) {
      alertType = "default";
    }

    if (!alertDuration) {
      alertDuration = this.alertDefaultDuration;
    }

    let newAlert: Alert = new Alert(alertMessage, new Date(), alertType, alertDuration);

    this.alerts.push(newAlert);
    setTimeout(() => {
      this.alerts.shift()?.alertText;
    }, alertDuration);
    this.alertCounter++;
  }
}
