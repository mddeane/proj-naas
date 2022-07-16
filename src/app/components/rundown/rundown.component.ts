import { DashboardComponent } from './../dashboard/dashboard.component';
import { AlertService } from './../../services/alert.service';
import { RundownItemService } from './../../services/rundown-item.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { RundownItem } from 'src/app/models/rundownItem.model';
import { Story } from 'src/app/models/story.model';

@Component({
  selector: 'app-rundown',
  templateUrl: './rundown.component.html',
  styleUrls: ['./rundown.component.css']
})


export class RundownComponent implements OnInit {

  rundownItems: RundownItem[] = [];

  itemDragged: RundownItem = new RundownItem(new Story(0, 'temp', '', '', 0, false), 'STORY', []);
  itemDraggedIndex: number = 0;
  selectedItemIndex: number = -1;
  alertItemIndex: number = -1;
  highlightedRows: RundownItem[] = [];

  newItem: RundownItem = new RundownItem(new Story(999999, 'New Story', '', '0:00', 0, false), 'STORY', []);

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

  getRowCss(rowType: string, index: number): string {
    let rowBg: string = "";
    let rowAlert: string = "";

    if (rowType == "BREAK") {
      rowBg = "row-break";
    }
    let alertTime;

    if (index == this.alertItemIndex) {
      rowAlert = " row-alert";
      alertTime = setTimeout(() => {
        rowAlert = "";
        this.alertItemIndex = -1;
      }, 500);
    } else {
      clearTimeout(alertTime);
    }

    let rowCss: string = `${rowBg} ${rowAlert}`;

    return rowCss;
  }

  // onDrag not doing anything at the moment
  onDrag(event: DragEvent, index: string) {
    // event.dataTransfer?.setData("text", index);
    // console.log('dragging', event, index);
  }

  onDragStart(item: RundownItem, index: number) {
    this.itemDragged = item;
    this.itemDraggedIndex = index;
    //    this.alertItemIndex = this.selectedItemIndex;
    // console.log('starting', event, item);
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    // console.log('dragged over', event);
  }

  onDragEnter(event: DragEvent, index: string) {
    event.stopPropagation();
    event.preventDefault();
    // console.log('drag enter', event, index);
  }

  onDragLeave(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    // console.log('drag leave', event);
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    this.moveItem(this.itemDragged, index);
    // console.log('dropped', event, "index: " + event.dataTransfer?.getData("text/plain"));
  }

  onDragEnd(event: DragEvent, index: number) {
    event.preventDefault();
    //    this.setSelectedItemIndex(index);
    this.setAlertItemIndex(index);
    this.getRowCss(this.itemDragged.itemType, index);
    // console.log('drag end', event);
  }

  moveItem(item: RundownItem, index: number) {
    this.rundownItemService.moveRundownItem(item, index, this.itemDraggedIndex);
  }

  moveItemDown(item: RundownItem, index: number, moves: number) {
    this.rundownItemService.moveRundownItemDown(item, index, moves);
  }

  moveItemUp(item: RundownItem, index: number, moves: number) {
    this.rundownItemService.moveRundownItemDown(item, index, moves * (-1));
  }

  addItemAbove(item: RundownItem, index: number) {
    this.rundownItemService.addRundownItem(item, index);
    this.setAlertItemIndex(index);
  }

  addItemBelow(item: RundownItem, index: number) {
    this.rundownItemService.addRundownItem(item, index + 1);
    this.setAlertItemIndex(index + 1);
  }

  deleteItem(index: number) {
    this.rundownItemService.deleteRundownItem(index);
  }

  setSelectedItemIndex(index: number) {
    this.selectedItemIndex = index;
    console.log("selectedItemIndex: " + this.selectedItemIndex);
  }

  setAlertItemIndex(index: number) {
    this.alertItemIndex = index;
    console.log("alertItemIndex: " + this.alertItemIndex);
  }

  unHighlightRow(item: RundownItem) {
    for (let i = 0; i < this.highlightedRows.length; i++) {
      if (this.highlightedRows[i] === item) {
        this.highlightedRows.splice(i, 1);
      }
    }
  }

  highlightRow(item: RundownItem) {
    !this.highlightedRows.includes(item) ? this.highlightedRows.push(item) : this.unHighlightRow(item);
  }
}
