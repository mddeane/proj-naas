import { StoryComponent } from './../../../proj-v1/src/app/components/story/story.component';
import { RundownComponent } from './components/rundown/rundown.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'rundown', component: RundownComponent },
  { path: 'story/:id', component: StoryComponent },

  // wildcard must be last
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
