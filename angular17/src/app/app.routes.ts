import { Routes } from '@angular/router';
import { FirstComponent } from './first-component.component';
import { SecondComponent } from './second-component.component';

export const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
];
