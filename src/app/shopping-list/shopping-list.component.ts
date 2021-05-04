import { Component, OnInit } from '@angular/core';
import { Ingridient } from '../shared/ingridients.model'
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingridients: Ingridient[]    // array of Ingridient object

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingridients = this.slService.getIngridients();
  }

}
