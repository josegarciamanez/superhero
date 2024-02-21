import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddHeroDialogComponent } from './components/add-hero-dialog.component';



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
  <router-outlet></router-outlet>
  <div class="fixed-action-button">
  <button mat-fab color="primary" aria-label="Add" (click)="openAddHeroDialog()>
    <mat-icon>add</mat-icon>
    </button>
  </div>
  `,
  styles: [`
  .example-spacer {
    flex: 1 1 auto;
  }

  .fixed-action-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  `],
})
export class AppComponent {
  title = 'superhero APP';
  firstComponent = { title: 'Lista Usuarios' };
  constructor(public dialog: MatDialog) {}

  openAddHeroDialog(): void {
    const dialogRef = this.dialog.open(AddHeroDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo fue cerrado');
      console.log(result);
    });
  }
}
