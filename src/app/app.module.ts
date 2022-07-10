import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StoryComponent } from './components/story/story.component';
import { RundownComponent } from './components/rundown/rundown.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageComponent } from './components/message/message.component';
import { AlertComponent } from './components/alert/alert.component';
import { FocusOffDirective } from './directives/focus-off.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StoryComponent,
    RundownComponent,
    DashboardComponent,
    MessageComponent,
    AlertComponent,
    FocusOffDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
