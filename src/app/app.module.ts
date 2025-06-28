import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockApiInterceptor } from './interceptors/mock-api.interceptor';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { BookmarkBarComponent } from './components/bookmark-bar/bookmark-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ActionBarComponent,
    BookmarkBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
