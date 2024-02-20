import { Component } from '@angular/core';
import { UserService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Hero } from './models/user.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-first-component',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatCardModule, MatButtonModule],
  providers: [UserService],
  template: `
  <div class="container">
    <ul class="d-flex flex-wrap w-100">
      @for (hero of heroes$ | async; track hero.id) {
        <mat-card class="example-card me-3 mb-3">
          <mat-card-header>
            <mat-card-subtitle>{{ hero.name | uppercase }}</mat-card-subtitle>
          </mat-card-header>
          <img mat-card-image  [src]='hero.image_url' alt="Photo of a Shiba Inu">
          <mat-card-actions>
            <button mat-button>Edit</button>
            <button mat-button>Delete</button>
          </mat-card-actions>
        </mat-card>
      } @empty {
        Empty list of heroes
      }
    </ul>
  </div>
  `,
  styles: [`
    .example-card {
      max-width: 400px;
    }
  `],
})
export class SecondComponent {
  public heroes$: Observable<Hero[]> = this.userService.getHeroes();

  constructor(private userService: UserService) {}
}
