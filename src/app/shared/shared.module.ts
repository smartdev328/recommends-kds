import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MasonsryViewComponent } from './layout/masonsry-view/masonsry-view.component';
import { SharedLibsModule } from './shared-libs.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedLibsModule
  ],
  declarations: [
    MasonsryViewComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MasonsryViewComponent
  ]
})
export class SharedModule { }
