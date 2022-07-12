import { DashboardComponent } from './../dashboard/dashboard.component';
import { AlertService } from './../../services/alert.service';
import { RundownItemService } from './../../services/rundown-item.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { RundownItem } from 'src/app/models/rundownItem.model';

@Component({
  selector: 'app-rundown',
  templateUrl: './rundown.component.html',
  styleUrls: ['./rundown.component.css']
})


export class RundownComponent implements OnInit {

  rundownItems: RundownItem[] = [];

  constructor(private rundownItemService: RundownItemService, public alertService: AlertService) { }

  ngOnInit(): void {
    this.getRundownItems();
  }

  getRundownItems(): void {
    this.rundownItemService.getRundownItems().subscribe(rundownItemData => this.rundownItems = rundownItemData);
  }

  test(testId: string) {
    this.alertService.showAlert(testId);
  }

  convertEstTime(milliseconds: number): string {
    let date = new Date(0, 0, 0, 0, 0, 0, milliseconds);
    let estTimeString = date.getUTCHours().toString(10);
    return estTimeString;
  }

  getRowCss(rowType: string): string {
    let rowCss: string = "";
    if (rowType == "BREAK") {
      rowCss = "row-break";
    }
    return rowCss;
  }
}
