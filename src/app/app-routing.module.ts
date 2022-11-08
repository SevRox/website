import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveDataComponent } from './live-data/live-data.component';
import { SettingsComponent } from './settings/settings.component';
import { GraphsComponent } from './graphs/graphs.component';

const routes: Routes = [
  { path: '', redirectTo: '/lifedata', pathMatch: 'full' },
  { path: 'livedata', component: LiveDataComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'graphs', component: GraphsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
