import { HeaderComponent } from './layout/header.component';
import { VenueListingComponent } from './venue-listing/venue-listing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventGroupComponent } from './event-group/event-group.component';
import { EventListingComponent } from './event/event-listing/event-listing.component';
import { HomeComponent } from './home/home.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { HelpComponent } from './help/help.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { VenuesComponent } from './venues/venues.component';
import { VenueComponent } from './venue/venue.component';
import { EditVenueComponent } from './edit-venue/edit-venue.component';
import { SearchVenueComponent } from './search-venue/search-venue.component';
import { ReviewsComponent } from './add-review/reviews.component';
import { ApproveReviewComponent } from './approve-reviews/approve-review.component';
import { AddCampComponent } from './add-camp/add-camp.component';
import { AddHikingTrailComponent } from './add-hiking/add-hiking.component';
import { CampsComponent } from './camps/camps.component';
import { SubscribeVenueComponent } from './subscribe-venue/subscribe-venue.component';
import { CampListingComponent } from './camp-listing/camp-listing.component';
import { HikingTrailsListingComponent } from './hiking-listing/hiking-listing.component';
import { HikingTrailComponent } from './hiking/hiking.component';
import { EditCampComponent } from './edit-camp/edit-camp.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { EditHikingTrailComponent } from './edit-hiking/edit-hiking.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { PersonalizedComponent } from './personalized/personalized.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './layout/callback/callback.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./event/event.module').then(mod => mod.EventModule)
  },

  // { path: 'events/:id', component: EventComponent },
  // { path: 'events/:id?parent_id=', component: EventComponent },
  // { path: 'edit-event/:eventId', component: EditEventComponent },
  // { path: 'family-friendly-events-near-me?q=', component: EventListingComponent },
  // { path: 'family-friendly-events-near-me', component: EventListingComponent },
  { path: 'data-entry', component: DataEntryComponent },
  { path: 'venues/:id', component: VenuesComponent },
  { path: 'venues/:id?parent_id=', component: VenuesComponent, },
  { path: 'family-friendly-places-near-me', component: VenueListingComponent, },
  { path: 'family-friendly-places-near-me?category=', component: VenueListingComponent, },
  { path: 'family-friendly-places-near-me?q=', component: VenueListingComponent, },
  { path: 'add-venue', component: VenueComponent },
  { path: 'edit-venue/:venueId', component: EditVenueComponent },
  { path: 'search-venue', component: SearchVenueComponent },
  { path: 'manage-venues', component: SubscribeVenueComponent },
  { path: 'edit-camp/:campId', component: EditCampComponent },
  { path: 'manage-venues?parent_id', component: SubscribeVenueComponent },
  { path: 'add/review', component: ReviewsComponent },
  { path: 'approve-reviews', component: ApproveReviewComponent },
  { path: 'add-camp', component: AddCampComponent },
  { path: 'add-hiking', component: AddHikingTrailComponent },
  { path: 'camps/:id', component: CampsComponent },
  { path: 'camps/:id?parent_id=', component: CampsComponent },
  { path: 'camps-near-me', component: CampListingComponent },
  { path: 'camps-near-me?category=', component: CampListingComponent },
  { path: 'family-friendly-hikes-near-me', component: HikingTrailsListingComponent },
  { path: 'family-friendly-hikes-near-me?q=', component: HikingTrailsListingComponent },
  { path: 'edit-camp/:campId', component: EditCampComponent },
  { path: 'edit-hiking/:hikingTrailId', component: EditHikingTrailComponent },
  { path: 'hiking-trails/:id', component: HikingTrailComponent },
  { path: 'hiking-trails/:id?parent_id=', component: HikingTrailComponent, },
  { path: 'help', component: HelpComponent },
  { path: 'coming-soon', component: ComingSoonComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'my-kin', component: PersonalizedComponent },
  { path: 'my-kin?parent_id=', component: PersonalizedComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
