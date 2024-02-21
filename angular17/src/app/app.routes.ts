import { Routes } from '@angular/router';
import { SecondComponent } from './second-component.component';

export const routes: Routes = [
  { path: '', redirectTo: 'second-component', pathMatch: 'full' }, 
  { path: 'second-component', component: SecondComponent },
];
