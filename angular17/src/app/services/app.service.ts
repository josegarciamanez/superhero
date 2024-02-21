import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero, User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly optionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly options$: Observable<string[]> = this.optionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  getHeroes(searchValue: string | null = ''): Observable<Hero[]> {
    return this.http.get<Hero[]>('https://65d38d62522627d50109227e.mockapi.io/api/v1/superheroes').pipe(
      map((heroes: Hero[]) => {
        const filteredHeroes = heroes.filter(hero => hero.name.toLowerCase().includes(searchValue!.toLowerCase()));
        const heroNames: string[] = filteredHeroes.map(hero => hero.name);
        this.optionsSubject.next(heroNames);
        return filteredHeroes;
      })
    );
  }
}