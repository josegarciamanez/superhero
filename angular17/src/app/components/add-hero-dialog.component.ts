import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../models/user.interface';
import { UserService } from '../services/app.service';
import { Observable, take, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-add-hero-dialog',
  standalone: true,
  imports:[ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    AsyncPipe,
    TitleCasePipe
],
providers: [UserService],
  template: `
  <div class="container mt-4 d-flex flex-column">
    <h1>{{title | titlecase}}</h1>
    <mat-form-field>
      <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="name" name="name" required>
        @if(!name) {
          <mat-error>El nombre es obligatorio</mat-error>
        }
      </mat-form-field>
    
      <mat-form-field>
        <mat-label>URL de la imagen</mat-label>
        <input matInput [(ngModel)]="imageUrl" name="imageUrl" required>
        @if(!imageUrl) {
          <mat-error>La url es obligatoria</mat-error>
        }
      </mat-form-field>
    
      </div>
      <div class="d-flex container">
        <span class="example-spacer"></span>
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button mat-button (click)="onAddHero()" [disabled]="!name || !imageUrl">
        @if(editHeroe){
          Editar
        } @else {
          Agregar
        }
        </button>
      </div>
  `,
    styles: [`
    .example-spacer {
        flex: 1 1 auto;
      }
    `],
  })

export class AddHeroDialogComponent {
  title: string = 'agregar nuevo heroe';
  name: string = '';
  imageUrl: string = '';
  heroes$: Observable<Hero[]> = this.userService.getHeroes();
  editHeroe: boolean = false;
  

  constructor(private router: Router, private userService: UserService) {
    const navigation = this.router.getCurrentNavigation();
    const hero = (navigation?.extras?.state as { hero: Hero })?.hero;

    if (hero) {
      this.name = hero.name;
      this.imageUrl = hero.image_url;
      this.title = 'editar heroe';
      this.editHeroe = true;
    }
  }

  onCancel(): void {
    this.router.navigate(['/'])
  }

  onAddHero(): void{
    this.userService.postHeroes(this.name, this.imageUrl);
    this.router.navigate(['/'])
  }
}