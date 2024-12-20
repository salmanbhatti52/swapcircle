import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { FlutterwaveModule } from "flutterwave-angular-v3"
@NgModule({
  declarations: [AppComponent, FloatingButtonComponent],
  imports: [BrowserModule, FlutterwaveModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    ReactiveFormsModule,
    FormsModule,
    // Camera,
    Clipboard,
    FingerprintAIO,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
