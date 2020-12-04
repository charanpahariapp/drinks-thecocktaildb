import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CocktailService } from './cocktail.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IDrink } from '../interfaces/ICocktail';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  searchCocktailControl = new FormControl('');
  ingredientControl = new FormControl([]);
  categoryControl = new FormControl([]);
  drinks: IDrink[] = [];
  ingredients: string[];
  categories: string[];
  constructor(
    private cocktailService: CocktailService
  ) { }

  ngOnInit(): void {
    this.searchCocktailControl.valueChanges.pipe(debounceTime(600), distinctUntilChanged()).subscribe(v => {
      this.getPage(v);
    });

    this.ingredientControl.valueChanges.pipe(debounceTime(600), distinctUntilChanged()).subscribe((v: string[]) => {
      if (v.length) {
        this.drinks.map(d => d.ingredients.some(i => v.includes(i)) ? d.hasIngredient = true : d.hasIngredient = false);
      } else {
        this.drinks.map(d => d.hasIngredient = true);
      }
    });

    this.categoryControl.valueChanges.pipe(debounceTime(600), distinctUntilChanged()).subscribe((v: string[]) => {
      if (v.length) {
        this.drinks.map(d => v.indexOf(d.strCategory) > -1 ? d.hasCategory = true : d.hasCategory = false);
      } else {
        this.drinks.map(d => d.hasCategory = true);
      }
    });

    this.getPage('');
  }

  getPage(v: string) {
    this.cocktailService.getCocktailByNameOrFirstLetter(v).subscribe(data => {
      this.drinks = data.drinks;
      this.listFilter();
    });
  }

  listFilter() {
    this.ingredients = [];
    this.categories = [];
    this.drinks.map(d => {
      const row = [];
      for (let i = 1; i < 15; i++) {
        if (d[`strIngredient${i}`]) {
          if (this.ingredients.indexOf(d[`strIngredient${i}`]) === -1) {
            this.ingredients.push(d[`strIngredient${i}`]);
            row.push(d[`strIngredient${i}`]);
          }
        }
      }

      d.ingredients = row;
      d.hasIngredient = true;
      d.hasCategory = true;

      if (this.categories.indexOf(d.strCategory) === -1) {
        this.categories.push(d.strCategory);
      }
    });

    this.ingredients.sort();
    this.categories.sort();
  }
}
