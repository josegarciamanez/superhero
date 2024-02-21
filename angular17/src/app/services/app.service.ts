import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay, map, take, tap } from 'rxjs/operators';
import { Hero } from '../models/user.interface';
import Swal from 'sweetalert2'

const heroes: Hero[] = [
  {
    "id": 1,
    "name": "Spider-Man",
    "image_url": "https://blog.es.playstation.com/tachyon/sites/14/2022/06/adf0c6e3da060a9f9581c12eff047a48668fe616.jpg"
  },
  {
    "id": 2,
    "name": "Batman",
    "image_url": "https://image.api.playstation.com/vulcan/img/rnd/202010/1520/F1WFbqD8WCEWYGErUSk1OAOf.png"
  },
  {
    "id": 3,
    "name": "Superman",
    "image_url": "https://cadenaser.com/resizer/nb92V29QzoN5KP8yaNWf_zE9eyE=/1200x675/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/OZRTFH56RRB27N5BYZX56WPERU.jpg"
  },
  {
    "id": 4,
    "name": "Iron Man",
    "image_url": "https://www.mundodeportivo.com/alfabeta/hero/2023/12/iron-man-endgame-ucm.jpg"
  },
  {
    "id": 5,
    "name": "Wonder Woman",
    "image_url": "https://i.blogs.es/fc7807/wonder-woman0/450_1000.jpg"
  },
  {
    "id": 6,
    "name": "Hulk",
    "image_url": "https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2021/09/increible-hulk-2456955.jpg"
  }
]

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly optionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly options$: Observable<string[]> = this.optionsSubject.asObservable();

  private readonly numberOfHeroes: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public readonly numberOfHeroes$: Observable<number> = this.numberOfHeroes.asObservable();

  private heroes: Hero[] = [];

  constructor(private http: HttpClient) {}

  getHeroes(searchValue: string | null = ''): Observable<Hero[]> {
    // Aquí hariamos la llamada al backend, de momento está con un mock
    // Se agrega un delay para que tenga un pequeño retardo la llamada y muestre el spinner de carga
    return of(heroes).pipe(
      delay(1000),
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
        id: numberOfHeroes + 1,
        name: name,
        image_url: imageUrl
      }
      heroes.push(newHero);
      this.numberOfHeroes.next(heroes.length);
      this.getHeroes();
    });
  }

  editHero(heroId: number, name: string, imageUrl: string): void {
    const heroIndex = heroes.findIndex(hero => hero.id === heroId);
    if (heroIndex !== -1) {
      heroes[heroIndex] = { id: heroId, name, image_url: imageUrl };
    }
  }
  
  deleteHero(heroId: number): void {
    const heroIndex = heroes.findIndex(hero => hero.id === heroId);
    if (heroIndex !== -1) {
      heroes.splice(heroIndex, 1);
      this.numberOfHeroes.next(heroes.length);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Heroe eliminado correctamente",
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
}