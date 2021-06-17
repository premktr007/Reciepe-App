import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private recipeService: RecipeService, private http: HttpClient) { }

  showSaveBtn: boolean = true;
  ngOnInit(): void {
  }

  saveData() {
      this.recipeService.saveRecipes().subscribe(res => {
        this.showSaveBtn = false;
        setTimeout(() => {    // disable saved button for 3s after saving
           this.showSaveBtn = true; 
        }, 3000);
      });    
  }

}
