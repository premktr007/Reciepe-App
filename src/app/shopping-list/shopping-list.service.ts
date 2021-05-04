import { Injectable } from '@angular/core';
import { Ingridient } from '../shared/ingridients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingridients: Ingridient[] = [
    new Ingridient('chilly powder', 5),
    new Ingridient('tomato', 5)
  ];   // shows that var ingridients hold array of Ingridient objects
  
  constructor() { }

  getIngridients() {
    return this.ingridients;
  }
  
  addIngridient(ingridient: Ingridient) {
    this.ingridients.push(ingridient);
  }

  addIngridients(ingredients: Ingridient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingridients.push(...ingredients);
  }

}
