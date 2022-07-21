import { FocusOffDirective } from './../../directives/focus-off.directive';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { AlertService } from './../../services/alert.service';
import { RundownItemService } from './../../services/rundown-item.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { RundownItem } from 'src/app/models/rundownItem.model';
import { Story } from 'src/app/models/story.model';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-rundown',
  templateUrl: './rundown.component.html',
  styleUrls: ['./rundown.component.css']
})


export class RundownComponent implements OnInit {

  rundownItems: RundownItem[] = [];

  itemDragged: RundownItem = new RundownItem(new Story(0, 'temp', '', '', 0, false), 'STORY', []);
  itemDraggedIndex: number = 0;
  selectedItemIndex: number = 0;
  alertItemIndex: number = -1;
  highlightedRows: RundownItem[] = [];
  previousValue: any;

  newItem: RundownItem = new RundownItem(new Story(999999, 'New Story', '', '0:00', 0, false), 'STORY', []);
  selectedItem: RundownItem = new RundownItem(new Story(-1, '', '', '', 0, false), '', []);

  pageNumbers: string[] = [];
  commercialBreaks: RundownItem[] = [];

  hoverModal: boolean = false;

  constructor(private rundownItemService: RundownItemService, public alertService: AlertService) { }

  ngOnInit(): void {
    this.getRundownItems();
  }

  getRundownItems(): void {
    this.rundownItemService.getRundownItems().subscribe(rundownItemData => this.rundownItems = rundownItemData);
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
    if (index !== 0) {
      this.rundownItemService.moveRundownItemDown(item, index, moves * (-1));
    }
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

  alphabetUppercase: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  pageCounter: number = 1;

  buildPageNumber(item: RundownItem, index: number): string {
    let pageNumber: string = "";

    if (index === 0) {
      this.pageCounter = 1;
      this.pageNumbers = [];
      this.commercialBreaks = [];
    }

    let block: string = "";
    let blockPageNumber: number = 0;

    if (this.commercialBreaks.length < this.alphabetUppercase.length) {
      block = this.alphabetUppercase[this.commercialBreaks.length];
    } else {
      let repeatBlock: number = Math.floor(this.commercialBreaks.length / this.alphabetUppercase.length);
      block = this.alphabetUppercase[this.commercialBreaks.length % this.alphabetUppercase.length];

      for (let i = 0; i < repeatBlock; i++) {
        block += block;
      }
    }

    pageNumber = block + this.pageCounter;

    if (item.itemType === "BREAK") {
      this.commercialBreaks.push(item);
      this.pageCounter = 1;
    } else {
      this.pageCounter++;
    }

    this.pageNumbers.push(pageNumber);
    return pageNumber;
  }

  // getApprovalBackground(storyApproval: boolean, readyForApproval: boolean, isEmpty: boolean): string {
  //   let bgColor: string = "";
  //   if (isEmpty) {
  //     bgColor = "bg-secondary";
  //   } else {
  //     if (storyApproval) {
  //       bgColor = "bg-success";
  //     } else if (readyForApproval) {
  //       bgColor = "bg-primary";
  //     } else {
  //       bgColor = "bg-secondary";
  //     }
  //   }
  //   return bgColor;
  // }

  test() {
    this.alertService.showAlert((Math.floor(27 / 26)).toString());
  }

  setSelectedItem(item: RundownItem) {
    this.selectedItem = item;
    console.log(this.selectedItem);
  }
}
