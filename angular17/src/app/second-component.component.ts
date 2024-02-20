import { Component } from '@angular/core';
import { UserService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Hero } from './models/user.interface';


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
          <li> {{ hero.name }}</li>
          @if(hero.image_url) {
            <img class="hero-image" [src]='hero.image_url' />
          }
      } @empty {
        Empty list of heroes
      }
    </ul>
  </div>
  `,
  styles: [`
    .hero-image {
      width: 200px
    }
  `],
})
export class SecondComponent {
  public heroes$: Observable<Hero[]> = this.userService.getHeroes();

  constructor(private userService: UserService) {}
}
