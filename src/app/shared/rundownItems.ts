import { STORIES } from './stories';
import { RundownItem } from './../models/rundownItem.model';


export const RUNDOWN_ITEMS: RundownItem[] = [
    new RundownItem(1, STORIES[0]),
    new RundownItem(2, STORIES[1]),
    new RundownItem(3, STORIES[2])
]