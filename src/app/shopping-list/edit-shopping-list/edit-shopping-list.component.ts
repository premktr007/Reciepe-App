import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingridient } from 'src/app/shared/ingridients.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrls: ['./edit-shopping-list.component.css'],
})
export class EditShoppingListComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  subscription: Subscription;
  ingridient: object;
  ingridientIndex: number;
  editMode: boolean = false;
  
  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.ingridientEditIndex.subscribe(
      (index: number) => {
        this.ingridientIndex = index;
        this.editMode = true;
        this.ingridient = this.slService.getIngridient(index);
        this.form.setValue({
          name: this.ingridient['name'],
          quantity: this.ingridient['quantity'],
        });
      }
    );
  }

  onIngridientAdded(ingridient: Ingridient) {
    if (this.editMode) {
      this.slService.updateIngridient(this.ingridientIndex, ingridient);
    } else {
      this.slService.addIngridient(ingridient);
    }
    this.form.reset();
  }

  onDeleteIngridient() {
    this.slService.deleteIngridient(this.ingridientIndex);
    this.form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
