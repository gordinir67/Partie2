import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorBannerComponent } from './components/error-banner/error-banner.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from './pages/country/country.component';
import { MedalChartComponent } from './components/medal-chart/medal-chart.component';
import { HeaderComponent } from './components/header/header.component';
import { LinechartComponent } from "src/app/components/linechart/linechart.component";
import { GlobalErrorInterceptor } from './interceptors/global-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CountryComponent,
    MedalChartComponent,
    HeaderComponent,
    ErrorBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   // IMPORTANT !!
    LinechartComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
