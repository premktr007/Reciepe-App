import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showSaveBtn: boolean = true;
  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(
    private recipeService: RecipeService, 
    private auth: AuthService) { }

 
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.isAuthenticated = user !== null;
    });
  }

  saveData() {
      this.recipeService.saveRecipes().subscribe(res => {
        this.showSaveBtn = false;
        setTimeout(() => {    // disable saved button for 3s after saving
           this.showSaveBtn = true; 
        }, 3000);
      });    
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
