import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbListModule, NbCheckboxModule, NbToastrModule, NbButtonModule, NbToggleModule, NbRadioModule, NbUserModule, NbMenuModule, NbWindowModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LiveDataComponent } from './live-data/live-data.component';
import { SettingsComponent } from './settings/settings.component';
import { GraphsComponent } from './graphs/graphs.component';
import { FormsModule } from '@angular/forms';
import { NgxEchartsMod } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';

import * as Hammmer from 'hammerjs';
import { DeleteBoardComponent } from './delete-board/delete-board.component';
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LiveDataComponent,
    SettingsComponent,
    GraphsComponent,
    DeleteBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'ourTheme' }),
    NbLayoutModule,
    HttpClientModule,
    NbEvaIconsModule,
    NbCardModule,
    NbListModule,
    NbCheckboxModule,
    NbToastrModule,
    FormsModule,
    NbButtonModule,
    NbToggleModule,
    NbRadioModule,
    HammerModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NbUserModule,
    NbMenuModule.forRoot(),
    NbWindowModule.forRoot()
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
