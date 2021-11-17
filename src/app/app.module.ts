import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LosChartComponent } from './los-chart/los-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LosChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ChartsModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
