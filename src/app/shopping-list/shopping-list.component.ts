import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../_models/ingredients';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Ingredient[];
  private subscription!: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.loadIngredients();
    //this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }
  loadIngredients() {
    this.slService.getIngredients().subscribe({
      next: responce => this.ingredients = responce
    });
  }
  onEditItem(index: number) {
    console.log('edited')
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
