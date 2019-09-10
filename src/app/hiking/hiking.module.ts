import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HikingRoutingModule } from './hiking-routing.module';
import { EditHikingTrailComponent } from './edit-hiking/edit-hiking.component';
import { HikingTrailComponent } from './hiking.component';
import { HikingTrailsListingComponent } from './hiking-listing/hiking-listing.component';
import { MasonsryHikingTrailViewComponent } from './hiking-listing/masonry-hiking-view/masonry-hiking-view.component';
import { AddHikingTrailComponent } from './add-hiking/add-hiking.component';
import { SharedModule } from 'app/shared/shared.module';
import { SharedLibsModule } from 'app/shared/shared-libs.module';
import { SavedHikingListingComponent } from './saved-hiking-listing/saved-hiking-listing.component';

@NgModule({
  imports: [
    CommonModule,
    HikingRoutingModule,
    SharedModule,
    SharedLibsModule
  ],
  declarations: [
    HikingTrailComponent,
    EditHikingTrailComponent,
    HikingTrailsListingComponent,
    MasonsryHikingTrailViewComponent,
    AddHikingTrailComponent,
    SavedHikingListingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HikingModule { }
