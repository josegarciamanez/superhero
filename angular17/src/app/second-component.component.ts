import {Component, OnInit } from '@angular/core';
import { UserService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Hero } from './models/user.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';


@Component({
  selector: 'app-first-component',
  standalone: true,
  imports: [HttpClientModule, 
    CommonModule, 
    MatCardModule, 
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    ],
  providers: [UserService],
  template: `
  <div class="container">
    <form class="example-form">
    <mat-form-field class="example-full-width w-100 mt-3">
      <mat-label>SuperHero</mat-label>
      <input type="text"
            placeholder="Selecciona"
            aria-label="SuperHero"
            matInput
            [formControl]="myControl"
            [matAutocomplete]="auto">
      <mat-autocomplete #auto="matAutocomplete">
        @for (option of filteredOptions | async; track option) {
          <mat-option [value]="option">{{option}}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  </form>
    <ul class="d-flex flex-wrap w-100">
      @for (hero of heroes$ | async; track hero.id) {
        <mat-card class="example-card me-3 mb-3">
          <mat-card-header>
            <mat-card-subtitle>{{ hero.name | uppercase }}</mat-card-subtitle>
          </mat-card-header>
          <img mat-card-image class="h-100"  [src]='hero.image_url' alt="hero.name">
          <mat-card-actions>
            <button mat-button (click)="editHero(hero)">Edit</button>
            <button mat-button (click)="deleteHero(hero)">Delete</button>
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

export class SecondComponent implements OnInit {
  myControl = new FormControl('');
  options$: Observable<string[]> = this.userService.options$;
  filteredOptions!: Observable<string[]>;
  heroes$: Observable<Hero[]>;

  constructor(private userService: UserService, private router: Router) {
    this.heroes$ = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.userService.getHeroes(value))
    );
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  editHero(hero: Hero): void {
    this.userService.editHero(hero.id, hero.name, hero.image_url)
  }
  
  async deleteHero(hero: Hero): Promise<void> {
    this.userService.deleteHero(hero.id)
    await this.router.navigate(['/add-hero']);
    this.reloadPage();
  }

  reloadPage() {
    this.router.navigate(['/']);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let filteredOptions: string[] = [];
    this.options$.subscribe(options => {
      filteredOptions = options.filter(option => option.toLowerCase().includes(filterValue));
    });
    return filteredOptions;
  }
}

