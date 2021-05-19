import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  index: number;
  constructor(private slService: ShoppingListService, private recipeService: RecipeService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
      this.index = +params['id'];     // + used for typecating to integer
      this.recipe = this.recipeService.getRecipe(this.index);
    });

  }

  onAddToShoppingList() {
    this.slService.addIngridients(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['/recipes']);
  }
}
