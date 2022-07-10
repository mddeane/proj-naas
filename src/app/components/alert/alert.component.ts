import { AlertService } from './../../services/alert.service';
import { Alert } from './../../models/alert.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];
  welcomeAlert: string = "You are using the NaaP app!";

  constructor(public alertService: AlertService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.alertService.showAlert(this.welcomeAlert)
    }, 2000);
  }

  calculateAlertBackgroundColor(alertType?: string): string {
    return "mdd-alert mdd-alert-" + alertType;
  }
}