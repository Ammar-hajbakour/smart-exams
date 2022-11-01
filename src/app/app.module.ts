import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { ExamsListPageComponent } from './exams-list-page/exams-list-page.component';
import { ExamDetailsPageComponent } from './exam-details-page/exam-details-page.component';
import { SharedModule } from './shared/shared.module';
import { LanguageModule } from '@upupa/language';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { FilterComponent } from './exams-list-page/filter/filter.component';


// import { TimerComponent } from './components/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ExamsListPageComponent,
    ExamDetailsPageComponent,
    SimpleLayoutComponent,
    FilterComponent
    // TimerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    LanguageModule.forRoot('en', {}, 'lang', '/assets/langs'),
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
