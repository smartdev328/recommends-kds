import { HeaderComponent } from './layout/header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { HelpComponent } from './help/help.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { ReviewsComponent } from './add-review/reviews.component';
import { ApproveReviewComponent } from './approve-reviews/approve-review.component';
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
    loadChildren: './event/event.module#EventModule'
  },
  {
    path: '',
    loadChildren: './camp/camp.module#CampModule'
  },
  {
    path: '',
    loadChildren: './venue/venue.module#VenueModule'
  },
  {
    path: '',
    loadChildren: './hiking/hiking.module#HikingModule'
  },

  { path: 'data-entry', component: DataEntryComponent },
  { path: 'add/review', component: ReviewsComponent },
  { path: 'approve-reviews', component: ApproveReviewComponent },
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
