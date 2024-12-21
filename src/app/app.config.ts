import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyA8cOWKSxsE91OXEkmQxf0neUbjCtUgcWU",
  authDomain: "ng-megaturnaround.firebaseapp.com",
  projectId: "ng-megaturnaround",
  storageBucket: "ng-megaturnaround.firebasestorage.app",
  messagingSenderId: "990177132967",
  appId: "1:990177132967:web:c197602b3ad97e8af37682"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()), 
  ]
};
