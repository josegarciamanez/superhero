import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Hero } from '../models/user.interface';
import { UserService } from '../services/app.service';
import { Observable, take, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-add-hero-dialog',
  standalone: true,
  imports:[ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    AsyncPipe
],
providers: [UserService],
  template: `
  <div class="container mt-4 d-flex flex-column">
    <h1>Agregar héroe</h1>
      <mat-form-field>
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="name">
      </mat-form-field>
      <mat-form-field>
        <mat-label>URL de la imagen</mat-label>
        <input matInput [(ngModel)]="imageUrl">
      </mat-form-field>
  
      </div>
      <div class="d-flex container">
        <span class="example-spacer"></span>
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button mat-button (click)="onAddHero()">Agregar</button>
      </div>
  `,
    styles: [`
    .example-spacer {
        flex: 1 1 auto;
      }
    `],
  })

export class AddHeroDialogComponent {
  name: string = '';
  imageUrl: string = '';
  heroes$: Observable<Hero[]> = this.userService.getHeroes();

  constructor(private router: Router, private userService: UserService) {

  }

  onCancel(): void {
    this.router.navigate(['/'])
  }

  onAddHero(): void{
    this.userService.postHeroes(this.name, this.imageUrl);
  }
}