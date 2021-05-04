import { Component, OnInit } from '@angular/core';
import { Ingridient } from 'src/app/shared/ingridients.model';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrls: ['./edit-shopping-list.component.css']
})
export class EditShoppingListComponent implements OnInit {

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onIngridientAdded(ingridient: Ingridient) {
    this.slService.addIngridient(ingridient);
  }

}
