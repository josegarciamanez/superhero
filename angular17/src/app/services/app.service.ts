import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Hero, User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly optionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly options$: Observable<string[]> = this.optionsSubject.asObservable();

  private readonly numberOfHeroes: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public readonly numberOfHeroes$: Observable<number> = this.numberOfHeroes.asObservable();

  private heroes: Hero[] = [];

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  getHeroes(searchValue: string | null = ''): Observable<Hero[]> {
    return this.http.get<Hero[]>('https://65d38d62522627d50109227e.mockapi.io/api/v1/superheroes').pipe(
      tap((heroes) => {
        this.heroes = heroes;
        this.numberOfHeroes.next(heroes.length)}),
      map((heroes: Hero[]) => {
        const filteredHeroes = heroes.filter(hero => hero.name.toLowerCase().includes(searchValue!.toLowerCase()));
        const heroNames: string[] = filteredHeroes.map(hero => hero.name);
        this.optionsSubject.next(heroNames);
        return filteredHeroes;
      })
    );
  }

  postHeroes(name: string, imageUrl: string): void {
    this.numberOfHeroes$.pipe(take(1)).subscribe((numberOfHeroes) => {
      const newHero: Hero = {
        id: 8,
        name: name,
        image_url: imageUrl
      }
      this.heroes.push(newHero);
      this.http.post<Hero[]>('https://65d38d62522627e.mockapi.io/api/v1/superheroes', this.heroes).subscribe(response => {
        console.log('Response from POST request:', response);
        this.numberOfHeroes.next(numberOfHeroes + 1);
      });
    });
  }
}