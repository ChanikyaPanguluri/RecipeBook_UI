import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../_models/recipe';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {
  baseUrl = "https://localhost:7011/api/Recipe/";
  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();
  startedEditing = new Subject<number>();
  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipebyIndex(index: number) {
    return this.recipes[index];
  }
  getRecipesnew() {
    return this.recipes.slice();
  }

  getRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl + 'get')
  }

  getRecipe(id: number) {
    return this.http.get<Recipe>(this.baseUrl + 'get/' + id)
  }

  addRecipe(value: any) {
    return this.http.post<Recipe>(this.baseUrl + 'add', value)
  }

  updateRecipe(value: any) {
    return this.http.put<Recipe>(this.baseUrl + 'edit', value)
  }

  deleteRecipe(id: number, index: number) {
    return (this.http.delete<Recipe>(this.baseUrl + id).subscribe(),
      this.recipes.splice(index, 1),
      this.recipesChanged.next(this.recipes.slice()))
  }

  // addRecipe(recipe: Recipe) {
  //   this.recipes.push(recipe);
  //   this.recipesChanged.next(this.recipes.slice());
  // }

  // deleteRecipe(index: number) {
  //   this.recipes.splice(index, 1);
  //   this.recipesChanged.next(this.recipes.slice());
  // }

  // updateRecipe(index: number, newRecipe: Recipe) {
  //   this.recipes[index] = newRecipe;
  //   this.recipesChanged.next(this.recipes.slice());
  // }

}
