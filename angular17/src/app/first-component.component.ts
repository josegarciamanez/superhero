import { Component } from '@angular/core';
import { UserService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from './models/user.interface';
import { Observable } from 'rxjs';
import { signal } from '@angular/core';

@Component({
  selector: 'app-first-component',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [UserService],
  template: `
  <div class="container">
    <p>Users List</p>
    <ul>
      @for (user of users$ | async; track user.id) {
          <li> {{ user.name }}</li>
      } @empty {
        Empty list of users
      }
    </ul>
    <p>Signal: {{value()}}</p>
    <button class="btn btn-primary" (click)="changeSignal()">Change Value</button>
  </div>
  `,
  styles: [],
})
export class FirstComponent {
  value = signal('Hello Signal');
  public users$: Observable<User[]> = this.userService.getUsers();

  constructor(private userService: UserService) {
    console.log(this.value());
  }

  changeSignal(): void {
    this.value.set('changed signal');
  }
}
