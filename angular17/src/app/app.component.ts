import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
  <mat-toolbar color="primary">
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
      <mat-icon>menu</mat-icon>
    </button>
    <span>{{ title | uppercase }}</span>
    <span class="example-spacer"></span>
    <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
      <mat-icon>favorite</mat-icon>
    </button>
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
      <mat-icon>share</mat-icon>
    </button>
  </mat-toolbar>
  <a class="px-3 mx-3 btn btn-outline-danger" routerLink="/first-component" routerLinkActive="active" >{{ firstComponent.title }}</a>
  <a class="btn btn-outline-danger" routerLink="/second-component" routerLinkActive="active" >Second Component</a>
  <router-outlet></router-outlet>
`,
  styles: [`
  .example-spacer {
    flex: 1 1 auto;
  }
  `],
})
export class AppComponent {
  title = 'superhero APP';
  firstComponent = { title: 'Lista Usuarios' };
}
