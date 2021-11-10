import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgAddressSearchModule } from 'projects/ng-address-search/';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgAddressSearchModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
