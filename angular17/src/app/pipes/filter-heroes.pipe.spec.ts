import { FilterHeroesPipe } from './filter-heroes.pipe';
import { Hero } from '../models/user.interface';

describe('FilterHeroesPipe', () => {
  let pipe: FilterHeroesPipe;

  beforeEach(() => {
    pipe = new FilterHeroesPipe();
  });

  it('should return the same array if no filter value is provided', () => {
    const heroes: Hero[] = [{ id: 1, name: 'Hero1', image_url: '' }, { id: 2, name: 'Hero2', image_url: '' }];
    expect(pipe.transform(heroes, '')).toEqual(heroes);
  });

  it('should filter heroes based on filter value', () => {
    const heroes: Hero[] = [{ id: 1, name: 'Hero1', image_url: '' }, { id: 2, name: 'Hero2', image_url: '' }];
    expect(pipe.transform(heroes, 'Hero1')).toEqual([{ id: 1, name: 'Hero1', image_url: '' }]);
  });

  it('should return an empty array if no heroes match the filter value', () => {
    const heroes: Hero[] = [{ id: 1, name: 'Hero1', image_url: '' }, { id: 2, name: 'Hero2', image_url: '' }];
    expect(pipe.transform(heroes, 'Hero3')).toEqual([]);
  });
});