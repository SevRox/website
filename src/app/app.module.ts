import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbListModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LiveDataComponent } from './live-data/live-data.component';
import { SettingsComponent } from './settings/settings.component';
import { GraphsComponent } from './graphs/graphs.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveDataComponent,
    SettingsComponent,
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'ourTheme' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
