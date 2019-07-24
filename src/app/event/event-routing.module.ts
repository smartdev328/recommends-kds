import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventComponent } from './event.component';
import { EventListingComponent } from './event-listing/event-listing.component';

const routes: Routes = [
    {
        path: 'events/:id',
        component: EventComponent
    },
    {
        path: 'edit-event/:eventId',
        component: EditEventComponent
    },
    {
        path: 'family-friendly-events-near-me',
        component: EventListingComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventRoutingModule { }

