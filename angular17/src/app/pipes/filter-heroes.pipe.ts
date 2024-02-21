import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../models/user.interface';

@Pipe({
  name: 'filterHeroes'
})
export class FilterHeroesPipe implements PipeTransform {
  transform(heroes: Hero[], filterValue: string): Hero[] {
    if (!filterValue) {
      return heroes;
    }
    return heroes.filter(hero => hero.name.toLowerCase().includes(filterValue.toLowerCase()));
  }
}