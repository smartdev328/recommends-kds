import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { VenueRoutingModule } from './venue-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { SharedLibsModule } from 'app/shared/shared-libs.module';
import { VenueComponent } from './venue.component';
import { VenuesComponent } from 'app/venue/venues/venues.component';
import { EditVenueComponent } from './edit-venue/edit-venue.component';
import { MasonsryVenuesViewComponent } from './masonsry-venues-view/masonsry-venues-view.component';
import { SearchVenueComponent } from './search-venue/search-venue.component';
import { SubscribeVenueComponent } from './subscribe-venue/subscribe-venue.component';
import { VenueListingComponent } from './venue-listing/venue-listing.component';

@NgModule({
  imports: [
    CommonModule,
    VenueRoutingModule,
    SharedModule,
    SharedLibsModule,
    NgxLinkifyjsModule,
  ],
  declarations: [
    VenueComponent,
    VenuesComponent,
    EditVenueComponent,
    MasonsryVenuesViewComponent,
    SearchVenueComponent,
    SubscribeVenueComponent,
    VenueListingComponent,
  ],
  exports:[MasonsryVenuesViewComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VenueModule { }
