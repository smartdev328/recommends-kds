import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventListingComponent } from './event-listing/event-listing.component';
import { SharedModule } from 'app/shared/shared.module';
import { SharedLibsModule } from 'app/shared/shared-libs.module';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    SharedLibsModule
  ],
  declarations: [
    EventComponent,
    EditEventComponent,
    EventListingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventModule { }
