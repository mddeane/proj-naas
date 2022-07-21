import { Directive, ElementRef, HostListener } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Directive({
  selector: '[appOnEnterKey]'
})
export class OnEnterKeyDirective {

  constructor(private el: ElementRef, public alertService: AlertService) { }
  @HostListener('keyup.enter') onOffFocus() {
    this.el.nativeElement.blur();
  }
}
