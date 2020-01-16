import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassListingComponent } from './class-listing/class-listing.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { VenueModule } from '../venue/venue.module';
//import { MasonsryVenuesViewComponent } from '../venue/masonsry-venues-view/masonsry-venues-view.component';


@NgModule({
  imports: [
    CommonModule,
    ClassesRoutingModule,
    SharedModule,
    VenueModule
  ],
  declarations: [ClassListingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]})
export class ClassesModule { }
