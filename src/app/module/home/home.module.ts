import { NgModule } from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { HttpModule }                   from '@angular/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports:    [ CommonModule, HttpModule, HomeRoutingModule ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }