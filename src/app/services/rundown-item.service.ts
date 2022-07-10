import { RundownItem } from './../models/rundownItem.model';
import { RUNDOWN_ITEMS } from './../shared/rundownItems';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RundownItemService {

  constructor() { }

  getRundownItems(): Observable<RundownItem[]> {
    const rundownItems = of(RUNDOWN_ITEMS);
    return rundownItems;
  }

  setRundownItems(rundownItem: RundownItem[]): void {

  }

}
