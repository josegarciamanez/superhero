import { Component } from '@angular/core';
import { UserService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-first-component',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [UserService],
  template: `
  <div class="container">
    <p>Heroes list</p>
    <ul>
      @for (hero of heroes$ | async; track hero.id) {
          <li> {{ hero.nombre }}</li>
      } @empty {
        Empty list of heroes
      }
    </ul>
  </div>
  `,
  styles: [],
})
export class SecondComponent {
  public heroes$: Observable<any[]> = this.userService.getHeroes();

  constructor(private userService: UserService) {}
}
