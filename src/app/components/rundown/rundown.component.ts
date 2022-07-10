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
}
