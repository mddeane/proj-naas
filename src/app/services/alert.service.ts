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

  showAlert(alertMessage: string, alertType?: string) {
    if (!alertType) {
      alertType = "default";
    }
    let newAlert: Alert = new Alert(alertMessage, new Date(), alertType);
    this.alerts.push(newAlert);
    setTimeout(() => {
      this.alerts.shift()?.alertText;
    }, 10000);
    this.alertCounter++;
  }
}
