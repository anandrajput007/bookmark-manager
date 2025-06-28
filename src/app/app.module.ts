import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockApiInterceptor } from './interceptors/mock-api.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { BookmarkBarComponent } from './components/bookmark-bar/bookmark-bar.component';
import { AddCollectionComponent } from './components/add-collection/add-collection.component';
import { AjIconPickerComponent } from './aj-components/aj-icon-picker/aj-icon-picker.component';
import { AjModalComponent } from './aj-components/aj-modal/aj-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ActionBarComponent,
    BookmarkBarComponent,
    AddCollectionComponent,
    AjIconPickerComponent,
    AjModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
