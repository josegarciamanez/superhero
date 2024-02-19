import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <h1 class="text-bg-danger text-center py-2">{{ title | uppercase }}</h1>
  <a class="px-3 mx-3 btn btn-outline-danger" routerLink="/first-component" routerLinkActive="active" >{{ firstComponent.title }}</a>
  <a class="btn btn-outline-danger" routerLink="/second-component" routerLinkActive="active" >Second Component</a>
  <router-outlet></router-outlet>
`,
  styles: [],
})
export class AppComponent {
  title = 'superhero APP';
  firstComponent = { title: 'Lista Usuarios' };
}
