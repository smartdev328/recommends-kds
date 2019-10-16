import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityListComponent } from './city-list/city-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule
  ],
  declarations: [CityListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]})
export class CityModule { }
