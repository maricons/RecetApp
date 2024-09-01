import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({ "projectId": "ionic-movil-grupo9", "appId": "1:39435686784:web:92314e82706aec62f62765", "storageBucket": "ionic-movil-grupo9.appspot.com", "apiKey": "AIzaSyAURv0OnOrELBad898eWLEKi-sYBcxuYUE", "authDomain": "ionic-movil-grupo9.firebaseapp.com", "messagingSenderId": "39435686784", "measurementId": "G-KWK90N6ZJ0" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging())],
  bootstrap: [AppComponent],
})
export class AppModule { }