import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VenueComponent } from './venue.component';
import { EditVenueComponent } from './edit-venue/edit-venue.component';
import { SearchVenueComponent } from './search-venue/search-venue.component';
import { SubscribeVenueComponent } from './subscribe-venue/subscribe-venue.component';
import { VenuesComponent } from './venues/venues.component';
import { VenueListingComponent } from './venue-listing/venue-listing.component';
import { SavedVenuesListingComponent } from './saved-venues-listing/saved-venues-listing.component';

const routes: Routes = [
  { path: 'venues/:id', component: VenuesComponent },
  { path: 'family-friendly-places-near-me', component: VenueListingComponent },
  { path: 'add-venue', component: VenueComponent },
  { path: 'edit-venue/:venueId', component: EditVenueComponent },
  { path: 'search-venue', component: SearchVenueComponent },
  { path: 'manage-venues', component: SubscribeVenueComponent },
  {path:'saved-venues-listing',component:SavedVenuesListingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenueRoutingModule { }
