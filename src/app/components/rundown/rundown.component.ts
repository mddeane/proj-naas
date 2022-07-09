import { STORIES } from './../../shared/stories';
import { Component, OnInit } from '@angular/core';
import { RundownItem } from 'src/app/models/rundownItem.model';
import { Story } from 'src/app/models/story.model';

@Component({
  selector: 'app-rundown',
  templateUrl: './rundown.component.html',
  styleUrls: ['./rundown.component.css']
})
export class RundownComponent implements OnInit {

  // story1: Story = new Story(1, "Story 1 Slug", "These are the words in the body of Story 1.", 30, false);
  // story2: Story = new Story(2, "Story 2 Slug", "These are the words in the body of Story 2.", 20, false);
  // story3: Story = new Story(3, "Story 3 Slug", "These are the words in the body of Story 3.", 50, false);

  // stories: Story[] = [this.story1, this.story2, this.story3];

  item1: RundownItem = new RundownItem(1, STORIES[0]);
  item2: RundownItem = new RundownItem(2, STORIES[1]);
  item3: RundownItem = new RundownItem(3, STORIES[2]);

  items: RundownItem[] = [this.item1, this.item2, this.item3];

  constructor() { }

  ngOnInit(): void {
  }

}
