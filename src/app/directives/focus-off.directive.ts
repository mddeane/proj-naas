import { AlertService } from './../services/alert.service';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusOff]'
})

export class FocusOffDirective {

  constructor(private el: ElementRef, public alertService: AlertService) { }

  @HostListener('focusout') onFocus() {
    this.alertService.showAlert(this.el.nativeElement.value);
  }
}
