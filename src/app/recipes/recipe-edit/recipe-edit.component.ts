import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  index: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  // fixes error occuring during production build
  get IngridientControls () {
    return ( this.recipeForm.get('ingredients') as FormArray).controls; // this line throws error in template
  }
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      this.editMode = params['id'] != null;
    });

    this.initForm();
  }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngridients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.index);
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngridients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              quantity: new FormControl(ingredient.quantity, [
                Validators.required,
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage),
      description: new FormControl(recipeDescription, [
        Validators.required,
        Validators.minLength(10),
      ]),
      ingredients: recipeIngridients,
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.index, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addIngridientRow() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        quantity: new FormControl(null, [
          Validators.required,
        ]),
      })
    );
  }

  onIngridientDelete(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
}
