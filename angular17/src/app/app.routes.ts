import { Routes } from '@angular/router';
import { SecondComponent } from './second-component.component';
import { AddHeroDialogComponent } from './components/add-hero-dialog.component';

export const routes: Routes = [
  { path: '', redirectTo: 'second-component', pathMatch: 'full' }, 
  { path: 'second-component', component: SecondComponent },
  { path: 'add-hero', component: AddHeroDialogComponent },
];
