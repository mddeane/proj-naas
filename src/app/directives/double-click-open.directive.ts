import { StoryService } from './../services/story.service';
import { AlertService } from './../services/alert.service';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDoubleClickOpen]'
})
export class DoubleClickOpenDirective {

  constructor(private el: ElementRef, public alertService: AlertService) { }

  @HostListener('dblclick') onDblClick() {
    let storyId = this.el.nativeElement.id;
    this.alertService.showAlert(storyId + " was double-clicked");
  }
}
