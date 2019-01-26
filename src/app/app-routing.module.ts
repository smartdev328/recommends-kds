import { VenueListingComponent } from './venue-listing/venue-listing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventGroupComponent } from './event-group/event-group.component';
import { EventListingComponent } from './event-listing/event-listing.component';
import { HomeComponent } from './home/home.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { HelpComponent } from './help/help.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { VenuesComponent } from './venues/venues.component';
import { VenueComponent } from './venue/venue.component';
import { EditVenueComponent} from './edit-venue/edit-venue.component';
import { SearchVenueComponent } from './search-venue/search-venue.component';
import { ReviewsComponent } from './add-review/reviews.component';
import { ApproveReviewComponent } from './approve-reviews/approve-review.component';
import { AddCampComponent} from './add-camp/add-camp.component';
import { CampsComponent } from './camps/camps.component';
import { SubscribeVenueComponent } from './subscribe-venue/subscribe-venue.component';
import { CampListingComponent } from './camp-listing/camp-listing.component';

const routes: Routes = [
  { path: 'event/:id', component: EventComponent },
  { path: 'events/:id?parent_id=', component: EventComponent },
  { path: 'events/:query', component: EventGroupComponent },
  { path: 'events', component: EventListingComponent },
  { path: 'help', component: HelpComponent },
  { path: 'data-entry', component: DataEntryComponent },
  { path: 'venue/:id', component: VenuesComponent },
  { path: 'venues/:id?parent_id=', component: VenuesComponent, },
  { path: 'venues', component: VenueListingComponent, },
  { path: 'venues?category', component: VenueListingComponent, },
  { path: 'venue', component: VenueComponent },
  { path: 'edit-venue/:venueId', component: EditVenueComponent},
  { path: 'search-venue', component: SearchVenueComponent },
  { path: 'manage-venues', component: SubscribeVenueComponent },
  { path: 'manage-venues?parent_id', component: SubscribeVenueComponent },
  { path: 'add/review', component: ReviewsComponent },
  { path: 'approve-reviews', component: ApproveReviewComponent },
  { path: 'add-camp', component: AddCampComponent },
  { path: 'camps/:id', component: CampsComponent },
  { path: 'camps/:id?parent_id=', component: CampsComponent },
  { path: 'camps', component: CampListingComponent },
  { path: 'camps?category=', component: CampListingComponent },
  { path: '', component: HomeComponent },
  { path: 'coming-soon', component: ComingSoonComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
