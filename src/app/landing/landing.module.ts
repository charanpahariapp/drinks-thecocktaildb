import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CocktailService } from './cocktail.service';

const routes: Routes = [{
  path: '',
  component: LandingComponent
}];

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    CocktailService
  ]
})
export class LandingModule { }
