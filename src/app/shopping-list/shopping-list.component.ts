import { Component, OnInit } from '@angular/core';
import { Ingridient } from '../shared/ingridients.model'

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingridients: Ingridient[] = [
    new Ingridient('chilly powder', 5),
    new Ingridient('tomato', 5)
  ];   // shows that var ingridients hold object ingridient array

  constructor() { }

  ngOnInit(): void {
  }

}
