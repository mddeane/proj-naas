import { STORIES } from './../shared/stories';
import { Story } from './../models/story.model';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StoryService {

  constructor(private messageService: MessageService) { }

  getStories(): Observable<Story[]> {
    const stories = of(STORIES);
    this.messageService.add("StoryService getStories()");
    return stories;
  }
}
