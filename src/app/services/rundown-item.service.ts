import { RundownItem } from './../models/rundownItem.model';
import { RUNDOWN_ITEMS } from './../shared/rundownItems';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root'
})
export class RundownItemService {

  constructor() { }

  getRundownItems(): Observable<RundownItem[]> {
    const rundownItems = of(RUNDOWN_ITEMS);
    return rundownItems;
  }

  setRundownItems(rundownItems: RundownItem[]): void {

  }

  moveRundownItem(rundownItem: RundownItem, index: number, indexRemove: number): void {
    RUNDOWN_ITEMS.splice(indexRemove, 1);
    RUNDOWN_ITEMS.splice(index, 0, rundownItem);
  }

  addRundownItem(rundownItem: RundownItem, index: number) {
    RUNDOWN_ITEMS.splice(index, 0, rundownItem);
  }

  deleteRundownItem(index: number) {
    RUNDOWN_ITEMS.splice(index, 1);
  }

}
