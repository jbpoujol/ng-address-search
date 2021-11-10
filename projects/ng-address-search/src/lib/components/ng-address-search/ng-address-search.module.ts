import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAddressSearchComponent } from './ng-address-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NgAddressSearchComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [NgAddressSearchComponent],
})
export class NgAddressSearchModule {}
