import { Routes } from '@angular/router';
import { HeroComponent } from './hero-component.component';
import { AddHeroDialogComponent } from './components/add-hero-dialog.component';

export const routes: Routes = [
  { path: '', redirectTo: 'second-component', pathMatch: 'full' }, 
  { path: 'second-component', component: HeroComponent },
  { path: 'add-hero', component: AddHeroDialogComponent },
];
