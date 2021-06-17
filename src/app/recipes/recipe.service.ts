import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingridient } from '../shared/ingridients.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = []; // shows that var recipes hold array of Recipe objects
  recipesArr = new Subject<any>();

  constructor(private http: HttpClient) {}

  saveRecipes() {
    return this.http.put('https://recipe-app-db1a0-default-rtdb.firebaseio.com/recipes.json', this.recipes);
  }

  setRecipes(recipes: Recipe[]) {
    if(recipes) {
      this.recipes = recipes;
      this.recipesArr.next(this.recipes.slice());
    }
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipe-app-db1a0-default-rtdb.firebaseio.com/recipes.json').pipe(
      tap(recipes => {
      this.setRecipes(recipes)
    }));
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index) {
    return this.recipes[index];
  }

  addRecipe(recipeObj: Recipe) {
    this.recipes.push(recipeObj);
    this.recipesArr.next([...this.recipes]);
  }

  updateRecipe(index: number, recipeObj: Recipe) {
    this.recipes[index] = recipeObj;
    this.recipesArr.next([...this.recipes]);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesArr.next([...this.recipes]);
  }
}
