import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { QuestionShowComponent } from './question-show/question-show.component';
import { QuestionGetComponent } from './question-get/question-get.component';
import { UOWErrorHandler } from '../error/uow.error.handler';
import { AppRoutingModule } from './/app-routing.module';
import { MapComponent } from './map/map.component';
import { MapSearchComponent } from './map-search/map-search.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionShowComponent,
    QuestionGetComponent,
    MapComponent,
    MapSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{provide: ErrorHandler, useClass: UOWErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
