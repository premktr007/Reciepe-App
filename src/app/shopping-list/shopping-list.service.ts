import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingridient } from '../shared/ingridients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingridients: Ingridient[] = [
    new Ingridient('chilly powder', 5),
    new Ingridient('tomato', 5)
  ];   // shows that var ingridients hold array of Ingridient objects
  ingridientEditIndex = new Subject<number>();


  constructor() { }

  getIngridients() {
    return this.ingridients;
  }
  
  getIngridient(i: number) {
    return this.ingridients[i]; 
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

  updateIngridient(index, ingridient: Ingridient) {
    this.ingridients[index] = ingridient;
  }

  deleteIngridient(index: number) {
    this.ingridients.splice(index, 1);
  }

}
