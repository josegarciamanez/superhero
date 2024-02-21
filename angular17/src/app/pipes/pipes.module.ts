import { NgModule } from '@angular/core';
import { FilterHeroesPipe } from './filter-heroes.pipe';

@NgModule({
  declarations: [
    FilterHeroesPipe
  ],
  exports: [
    FilterHeroesPipe
  ]
})
export class PipesModule { }