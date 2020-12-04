import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(
    private httpService: HttpService
  ) { }

  getCocktailByNameOrFirstLetter(name: string) {
    if (name.length === 1) {
      return this.httpService.get(`/search.php?f=${name}`);
    } else {
      return this.httpService.get(`/search.php?s=${name}`);
    }
  }

  getIngredientsByName(name: string) {
    return this.httpService.get(`/search.php?i=${name}`);
  }

  getCocktailDetailsById(id: number) {
    return this.httpService.get(`/lookup.php?i=${id}`);
  }

  getRandomCocktail() {
    return this.httpService.get(`/random.php`);
  }
}

